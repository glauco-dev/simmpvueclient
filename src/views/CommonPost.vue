<script setup lang="ts">
import SocialShare from '@/components/SocialShare.vue';
import { parseApiPost } from '@/helpers';
import { router } from '@/main';
import { baseApi, baseRequestHeaders, type CommonPost } from '@/store';
import { ref } from 'vue';
import type { WP_REST_API_Post } from 'wp-types';

import Divider from 'primevue/divider';

const post = ref({} as CommonPost);

fetch(`${baseApi}wp-json/wp/v2/posts/${router.currentRoute.value.params.id}?_embed`, baseRequestHeaders).then(
    (response) => (response.ok) ? response.json().then(
        (data: WP_REST_API_Post) => {
            post.value = parseApiPost(data)
        }) : null);

</script>

<template>
    <ProgressSpinner v-if="!post.title"></ProgressSpinner>
    <div class="container" v-else>
        <div class="heading">
            <h4 v-html="post.title"></h4>
            <Divider />
            <small>
                {{ post.data }}
            </small>
        </div>
        <p class="content-page" v-html="post.content"></p>
        <SocialShare></SocialShare>
    </div>
</template>

<style lang="scss" scoped>
.container {
    padding-bottom: 200px;
    small {
        text-align: center;
    }

    .wp-block-image {
        display: flex;
        width: 100%;
        margin-inline: auto;
        height: fit-content;
        flex-direction: column;

        img {
            object-fit: contain;
            width: 100% !important;
            height: 100% !important;
        }
    }

    .heading {
        font-size: 14pt;

        h4 {
            font-size: 16pt;
            color: rgba(34, 34, 34, 0.8196078431);
            font-weight: bold;
            margin-top: 2em;
        }
    }

    .content-page {
        width: 109ch;
        margin-inline: auto;
        max-width: 100%;
        text-align: justify;
    }

}
</style>