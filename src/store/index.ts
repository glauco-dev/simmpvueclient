import type { WP_REST_API_Attachment, WP_REST_API_Post } from "wp-types";
import { reactive } from 'vue'
import { parseApiPost } from '@/helpers';
import { type User, getAuth, onAuthStateChanged } from "firebase/auth";
import firebase_app from './firebase.config.ts';
import { type DocumentData } from "firebase/firestore";

const env = {
  development: true
}
export const baseApi = env.development? 'https://simmp.com.br/wordpress/': 'wordpress/'



export type TLink = {path?:string, name:string, links?:TLink[]}


export const BaseLinks = {
    CommonPost : '/pagina/',
    Categorias : '/categorias/',
}

export const logo = './'

export const baseRequestHeaders = {
  headers: {
    // 'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
    // 'Authorization': 'Bearer '+token
 }
}

export const enum api_cats {
  destaques = 4,
  noticias = 8,
  galerias = 6,
  campanhas = 7,
  agenda = 2,
  fme = 5,
  exclusivos = 16,
}

export const links:(TLink)[] = [
    {path: '/', name: 'Início'},
    {path: '/afiliado', name: 'Afiliação'},
    {path: '/categorias/'+api_cats.agenda, name: 'Agenda'},
    {name: 'Sobre', 
        links:[
            {path: '/institucional#historia', name: 'História'},
            {path: '/institucional#estatudo', name: 'Estatudo'},
            {path: '/institucional#diretoria', name: 'Diretoria'},
            {path: '/institucional#legislativo', name: 'Legislação'},
            {path: '/institucional#creches-e-escolas', name: 'Creches e escolas'},
        ]},
]

export type CommonPost = {
  title: string,
  data: string,
  featured: string,
  content: string,
  id: number,
  tags?:number[],
  excerpt: string,
}

// manual fetch for content
fetch(baseApi+`wp-json/wp/v2/posts?_embed&categories=${api_cats.destaques}`, baseRequestHeaders).then(
    (response) => (response.ok) ? response.json().then(
        (data:WP_REST_API_Post[]) => (store.detaques = data.map(parseApiPost).slice(0, 9))) : null);

fetch(baseApi+`wp-json/wp/v2/banners?_embed`, baseRequestHeaders).then(
    (response) => (response.ok) ? response.json().then(
        (data:WP_REST_API_Post[]) => {
          store.banners = data.map(parseApiPost)
        }) : null);

fetch(baseApi+`wp-json/wp/v2/posts?_embed&categories=${api_cats.noticias}`, baseRequestHeaders).then(
  (response) => (response.ok) ? response.json().then(
      (data:WP_REST_API_Post[]) => (store.noticias = data.map(parseApiPost))) : null);
  

// store composition
export const store = reactive({
  detaques: [] as CommonPost[],
  banners: [] as any[],
  noticias: [] as CommonPost[],
  user: null as any,
})


const auth = getAuth(firebase_app);

export type Afiliado = {
    frente: {
        nome: string,
        email: string,
        foto: string,
        cargo: string,
        insc: string,
        cpf: string,
        rg: string,
        nascimento: string,
        matricula: string,
        emissao: string,
    },
    atras: {
        filiacao: string,
        senha: string,
        naturalidade: string,
        uf: string,
        endereco: string,
        bairro: string,
        cep: string,
        cidade: string,
        lote: string,
        assinatura_presidente: string
    }

}

export type defaultUserData = {
  "Nome": string,
  "Foto": string,
  "Rg": string,
  "Cpf": string,
  "Naturalidade": string,
  "Matrícula": string,
  "Lote": string,
  "Escola": string,
  "Email": string,
  "Telefone": string,
  "Nascimento": string,
  "InscSocial": string,
  "Cidade": string,
  "Uf": string,
  "Cep": string,
  "Endereço": string,
  "Formação": string,
  "Função": string,
  "Admissão": string,
    }

export function deserializeUser(user: DocumentData): Afiliado {
    const { nome, foto, email, cargo, insc, cpf, rg, nascimento, matricula, emissao, filiacao, naturalidade, uf, endereco, bairro, senha, cep, cidade, lote, assinatura_presidente } = user;
    return { frente: { nome, email, foto, cargo, insc, cpf, rg, nascimento, matricula, emissao }, atras: { filiacao, senha, naturalidade, uf, endereco, bairro, cep, cidade, lote, assinatura_presidente } }
}

export type userBasedListener = (user: User) => Promise<void>;
export const __AUTH_CONTENT__ = {
    user: {} as defaultUserData,
    setUser: (d: any) => { },
    isLoding: false, error: ""
};
export type TAuth = typeof __AUTH_CONTENT__;

export const __NO_USER_ERROR__ = "Current user not Found";
export const __NO_POSTS_ERROR__ = "No posts avaliable";

export function userBasedListenerFac(listener: userBasedListener) {
    return async () => {
        return auth.currentUser ? listener(auth.currentUser) : __NO_USER_ERROR__;
    }
}

export const LabelsMap = {
  nome: "Nome",
  email: "Email",
  foto: "Goto",
  cargo: "Cargo",
  insc: "N° Insc.",
  cpf: "CPF",
  rg: "RG",
  nascimento: "Cascimento",
  matricula: "Matrícula",
  emissao: "D. Emissão",
  filiacao: "Filiação",
  naturalidade: "Naturalidade",
  uf: "UF",
  endereco: "Endereço",
  bairro: "Bairro",
  cep: "CEP",
  cidade: "Cidade",
  lote: "Lote",
}

