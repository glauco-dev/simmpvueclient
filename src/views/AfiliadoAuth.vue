<script setup lang="ts">
import { baseApi,  type CommonPost as TCp, api_cats } from '@/store';
import { onMounted, ref } from 'vue';
import Divider from 'primevue/divider'
import {superWPJsonFetch, retrieveParseSingleApiObj, parseApiPost} from '../helpers';
import type { WP_REST_API_Category } from 'wp-types';

import Cookie from 'cookie.js';
import ProgressSpinner from 'primevue/progressspinner';
import CardGrid from "@/components/CardGrid.vue";

const posts = ref([] as TCp[]);
const catData = ref({} as WP_REST_API_Category);

const user = Cookie.get('simmp');
if(!user) window.location.assign('/login');

onMounted(async ()=>{
    posts.value = await superWPJsonFetch(`${baseApi}wp-json/wp/v2/posts?categories=${api_cats.exclusivos}&_embed`);
    catData.value = (await retrieveParseSingleApiObj(`${baseApi}wp-json/wp/v2/categories/${api_cats.exclusivos}`) as WP_REST_API_Category);
    loading.value = false
})

const loading = ref(true);

</script>

<template>
  <ProgressSpinner v-if='loading'></ProgressSpinner>
    <div v-else class="container">
        <h5>{{ catData.name }}</h5>
        <small>{{ catData.description }}</small>
        <Divider/>
        <CardGrid :perrow="1" :storeData="posts" :title="''" :vejamais="false">
        </CardGrid>
    </div>
</template>

<style scoped>
    .container{
        margin-top: 6em;
        h5{
            color: #222
        }
        small{
            font-size: 12pt;
            color: #444
        }
    }
</style>