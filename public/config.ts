import { WP_REST_API_Post } from "wp-types";

export type TLink = {path?:string, label:string, links?:TLink[]}

export const links:(TLink)[] = [
    {path: '/', label: 'Início'},
    {path: '/afiliado', label: 'Afiliação'},
    {path: '/agenda', label: 'Agenda'},
    {label: 'Sobre', 
        links:[
            {path: '/institucional#historia', label: 'História'},
            {path: '/institucional#estatudo', label: 'Estatudo'},
            {path: '/institucional#diretoria', label: 'Diretoria'},
            {path: '/institucional#legislativo', label: 'Legislação'},
            {path: '/institucional#creches-e-escolas', label: 'Creches e escolas'},
        ]},
]

export const logo = './'

export const baseApi = 'https://simmp.com.br/wordpress/'

export const enum api_cats {
    destaques = 6
}

export type CommonPost = {
  title: string,
  data: string,
  featured: string,
  content: string,
  id: number,
  tags?:number[],
  excerpt: string,
}

export function fixWPDate(date:string){
    let a = date.split(/-|\s|:/);
    a = [a[0],a[1], ...a[2].split('T'), a[3], a[4]]
    a = [ 'às ', a[3],":", a[4], ' de ', a[2],"/", a[1],"/", a[0]]
    return a.join('');
  }
  
  
  export function parseApiPost(post:WP_REST_API_Post) {
    let featured = ''
    if(post._embedded){
      if(post._embedded['wp:featuredmedia'])
        if(post._embedded['wp:featuredmedia'][0]){
          // @ts-ignore
          featured = post._embedded['wp:featuredmedia'][0].source_url
        }
    }
    let d = post.content.rendered.split("hidden").join('');
    
    return {
      content: d,
      data: fixWPDate(post.date),
      excerpt: post.excerpt.rendered,
      id: post.id,
      featured,
      tags:post.categories,
      title: post.title.rendered
    }
  }