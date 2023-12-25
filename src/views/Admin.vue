<template>
    <form v-if="!logado" :onsubmit="onSubmit" method="get" action="#">
        <Toast></Toast>
        <h4>
            Administração:
        </h4>
        <p>
            pode-se aprovar cadastros de afiliação mediante número de matrícula para que esse tenha acesso a carteira do
            sindicato e conteúdos exclusivos
        </p>
        <span class="p-float-label">
            <InputText id="email" v-model="email" />
            <label for="email">Email de login</label>
        </span>
        <span class="p-float-label">
            <InputText id="username" v-model="senha" type="password" />
            <label for="username">Senha</label>
        </span>
        <Button label="Logar" type="submit" />
        <a href="#" v-on:click="recuperar">Recuperar senha por email</a>
    </form>
    <div class="container" v-else>
        <h4>Candidatos para afiliação</h4>
        <Accordion :activeIndex="0" id="candidatos" style="">
            <!-- <Empty v-if="==0"></Empty> -->
            <AccordionTab v-for="afiliado of afiliados">
                <template #header>
                    <div class="header">
                        <span>{{ afiliado.dados.Nome }}</span>
                    </div>
                </template>
                <div style="display:flex">
                    <div class="buttons">
                        <img :src="afiliado.foto" style="height:200px;max-width:300px;object-fit:contain" />
                        <span class="p-float-label">
                            <InputText id="" v-model="afiliado.dados['Matrícula']" />
                            <label for="Matrícula">N° de Matrícula para aprovação</label>
                        </span>
                        <Button label="Aprovar" :disabled="!afiliado.dados['Matrícula']" :onClick="aprovar(afiliado)"></Button>
                        <Button label="Descartar" :onClick="reprovar(afiliado)"></Button>
                    </div>
                    <embed :src="afiliado.assinatura" type="application/pdf">
                    </div>
            </AccordionTab>

        </Accordion>
    </div>
</template>
<script setup lang="ts">
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';
import { useToast } from "primevue/usetoast";
import { onMounted, ref, Suspense } from 'vue';
import { QuerySnapshot, collection, deleteDoc, doc, getDocs, getFirestore, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";
import firebase_app from '@/store/firebase.config';
import { ref as fbref, getDownloadURL, getStorage } from 'firebase/storage';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Empty from '@/components/Empty.vue';

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebase_app);
const storage = getStorage();


const toast = useToast();

const adminLogin = 'formsindicalsimmp@gmail.com';

let email: string;
let senha: string;
const logado = ref(false);
const afiliados = ref([] as any);

const auth = getAuth();

const parseAsyncAfiliadosData = async (collection_: QuerySnapshot) => {
    Promise.all(collection_.docs.map(async (d: any) => {
        let data = d.data();
        const photoRef = fbref(storage, data.foto);
        const assinaturaRef = fbref(storage, data.assinatura);
        const foto = await getDownloadURL(photoRef);
        const assinatura = await getDownloadURL(assinaturaRef);

        return { ...data, uid: d.id, foto, assinatura };
    }))
        .then(data => {
            afiliados.value = data
        })
}
getDocs(query(collection(db, 'afiliados'), where('ativo', '==', false))).then(parseAsyncAfiliadosData);

const aprovar = (afiliado: any) => (e: any) => {
    e.preventDefault();
    updateDoc(doc(db, "afiliados", afiliado.uid), {
        ativo: true,
        dados: {...afiliado.dados}
    }).then(async () => {
        toast.add({ detail: "Novo afiliado aprovado com sucesso", life: 3000 });
        afiliados.value = afiliados.value.filter((afil: any) => afil.uid !== afiliado.uid)
    })
}
const reprovar = (afiliado: any) => (e:any) => {
    e.preventDefault();
    deleteDoc(doc(db, "afiliados", afiliado.uid))
    .then(() => {
        toast.add({ detail: "Cadastro para afiliação descartada com sucesso", life: 1000 });
        afiliados.value = afiliados.value.filter((afil: any) => afil.uid !== afiliado.uid)
    })
}

const onSubmit = async (ev: any) => {
    ev.preventDefault();
    if (email != adminLogin) return toast.add({ detail: 'Email inválido de administrador' });
    if (email.length < 3 || senha.length < 3) return toast.add({ detail: 'Usuário ou senha inválidos' });
    try {
        signInWithEmailAndPassword(auth, email, senha)
            .then(data => {
                let { user } = data;
                toast.add({ severity: 'info', summary: 'Info', detail: 'Simmp conta admin logada com sucesso', life: 3000 })
                logado.value = true;
            })
            .catch((err) => {
                switch (err.code) {
                    case 'auth/wrong-password': toast.add({ severity: 'info', summary: 'Info', detail: 'Senha ou usuário incorretos', life: 3000 })
                        toast.add({ severity: 'info', summary: 'Info', detail: 'Senha ou usuário incorretos', life: 3000 })
                }
            })
    } catch (error) {
    }
    return false;
}


const recuperar = () => {
    sendPasswordResetEmail(auth, adminLogin).then(d => {
        toast.add({ detail: 'Email de recuperação enviado' })
    })
}


</script>

<style lang="scss" scoped>
h4 {
    font-size: 18pt;
}

form {
    width: 500px;
    max-width: 100vw;
    margin-inline: auto;
    margin-top: 3em;

    a {
        display: block;
    }
}

#candidatos {
    max-width: 80%;

    margin-inline: auto;
    margin-top: 3em;

    .header {
        display: flex;
        justify-content: space-between;
        width: 100%;
        align-items: baseline;
    }

    .buttons{
        display: flex;
        gap: 3px;
        flex-direction: column;
    }
    button {
        position: relative;
        height: min-content;
    }

    embed {
        width: calc(100% - 200px);
        padding: 1em;
        padding-top: 1em;
        height: 700px;
    }
}
</style>