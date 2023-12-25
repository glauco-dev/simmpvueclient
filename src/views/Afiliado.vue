<template>
    <article class="container" style="height:fit-content;display: block;overflow-y: scroll;">
    <Cadastro v-if="!user"></Cadastro>
    <Suspense>
        <Carterinha v-if="pasta && user" :user="pasta"></Carterinha>
    </Suspense>
    </article></template>

<script setup lang="ts">
import Carterinha from '@/components/Carterinha.vue';
import Cadastro from '@/components/Cadastro.vue';
import { doc, onSnapshot } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import firebase_app from '@/store/firebase.config'
import type { defaultUserData } from '@/store';
import {computed, onMounted, reactive, ref, Suspense, type Ref} from 'vue';
import Cookie from 'cookie.js';
const user = Cookie.get('simmp');

// @ts-ignore
const pasta:Ref<any> = ref()


const db = getFirestore(firebase_app);
if(user)
onSnapshot(doc(db, 'afiliados', user.toString()), (doc) => {

    if(doc.exists()){
        pasta.value = {uid:doc.id, ...doc.data()} as any;
    }
})

</script>

<style lang="scss" scoped>

@import '../vars.scss';

.MuiFormGroup-root {
    max-width: 90vw;
    margin-top: 3em;
    float: right;
    height: 100%;
    width: 15cm;
    margin-left:2cm;

    .content {
        width: 40%;
        height: 100%;
        display: flex;
    }
}

[aria-hidden] {
    display: none;
}

.container{
    width: 100% !important;
    display: flex !important;
    padding: 0px;
    margin: 0px;
      margin-top: 0px;
    margin-top: 3em;
    max-width: 2000px;
    margin-inline: auto;
    justify-content: center;
    flex-wrap: wrap;
}

@media (min-width: 1024px) {}</style>
