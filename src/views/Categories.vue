<script setup lang="ts">
import { router } from '@/main';
import { baseApi,  type CommonPost as TCp } from '@/store';
import { onMounted, ref } from 'vue';
import Divider from 'primevue/divider';
import ProgressSpinner from 'primevue/progressspinner'
import {superWPJsonFetch, retrieveParseSingleApiObj} from '../helpers';
import type { WP_REST_API_Category } from 'wp-types';

import CardGrid from "@/components/CardGrid.vue";
const props = defineProps({
  catName: String
})

const posts = ref([] as TCp[]);
const catData = ref({} as WP_REST_API_Category);

onMounted(async ()=>{
    posts.value = await superWPJsonFetch(`${baseApi}wp-json/wp/v2/posts?categories=${router.currentRoute.value.params.id}&_embed`);
    catData.value = (await retrieveParseSingleApiObj(`${baseApi}wp-json/wp/v2/categories/${router.currentRoute.value.params.id}`) as WP_REST_API_Category);
})


</script>

<template>
    <ProgressSpinner v-if='!catData.name'></ProgressSpinner>
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
        padding-bottom: 8em;
        h5{
            color: #222
        }
        small{
            font-size: 12pt;
            color: #444
        }
    }
</style>