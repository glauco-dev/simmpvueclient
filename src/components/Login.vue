<script setup lang="ts">

import Button from 'primevue/button';
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
// @ts-ignore
import Toast from 'primevue/toast';
import { useToast } from "primevue/usetoast";
import Cookie from 'cookie.js'
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import firebase_app from '@/store/firebase.config';
import { router, toggleLoading } from '@/main';
const toast = useToast();
const user = Cookie.get('simmp');
if(user)
    window.location.assign('/afiliado')

const logar = async () => {
    toggleLoading()
    const auth = getAuth();
    
    if (!email || !senha) return toast.add({ severity: 'info', summary: 'Info', detail: 'Usuário e senha requeridos', life: 3000 });

    signInWithEmailAndPassword(auth, email, senha)
        .then(async data => {
            let { user } = data;
            if(!user.emailVerified){
                toast.add({ severity: 'info', summary: 'Info', detail: 'Email de verificação não confirmado', life: 3000 });
                return toggleLoading();
            }
            const db = getFirestore(firebase_app);

            let doc_ = await getDoc(doc(db, "afiliados", user.uid))
            if(doc_.exists()){
                let dados = doc_.data()
                toast.add({ severity: 'info', summary: 'Info', detail: dados.ativo? 'Seja bem vindo': 'Afiliação pendente de aprovação', life: 3000 });
                toggleLoading()
                dados.ativo? (Cookie.set("simmp", user.uid), router.push('/afiliado')): null
            }
           
        })
        .catch((err) => {
            switch (err.code) {
                case 'auth/wrong-password': toast.add({ severity: 'info', summary: 'Info', detail: 'Senha ou usuário incorretos', life: 3000 })
                toast.add({ severity: 'info', summary: 'Info', detail: 'Senha ou usuário incorretos', life: 3000 })
            }
            toggleLoading();
        })
}

var email: string;
var senha: string;

</script>
<template>
    <Toast />
    <div id="login" class=" container styles_form-group__f_v1W">
        <span>Ainda não se afiliou? <router-link to="/afiliado" class="login-form-alt">Preencha esse cadastro</router-link></span><span>
        </span>
        <div class="form">
            <div class="MuiFormControl-root MuiTextField-root css-i44wyl"><label
                    class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiFormLabel-filled Mui-required MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined css-1ald77x"
                    data-shrink="true" for=":r2:" id=":r2:-label">Email<span aria-hidden="true"
                        class="MuiFormLabel-asterisk MuiInputLabel-asterisk css-sp68t1"> *</span></label>
                <div
                    class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl css-1v4ccyo">
                    <input aria-invalid="false" id=":r2:" v-model="email" placeholder="exemplo@email.com"
                        class="MuiInputBase-input MuiOutlinedInput-input css-1x5jdmq" type="text">

                </div>
            </div>
            <div class="MuiFormControl-root MuiTextField-root css-i44wyl"><label
                    class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiFormLabel-filled Mui-required MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined css-1ald77x"
                    data-shrink="true" for=":r3:" id=":r3:-label">Senha<span aria-hidden="true"
                        class="MuiFormLabel-asterisk MuiInputLabel-asterisk css-sp68t1"> *</span></label>
                <div
                    class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl css-1v4ccyo">
                    <input aria-invalid="false" id=":r3:" v-model="senha"   placeholder="********"
                        class="MuiInputBase-input MuiOutlinedInput-input css-1x5jdmq" type="password">

                </div>
            </div><Button v-on:click="logar" label="Logar"></Button>
        </div>
    </div>
</template>

<style lang="scss">
#login {
    margin-top: 3em;

    .form {
        padding: 2em;
        padding-bottom: 2em;
        padding-bottom: 1em;
        border: 1px solid #818181;
        border-radius: 12px;
        margin-top: 1em;
        padding-bottom: 2em;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 2em;

        &>div {
            width: 100%;
        }
    }
}</style>