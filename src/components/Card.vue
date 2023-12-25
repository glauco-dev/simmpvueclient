<script setup lang="ts">
import { BaseLinks } from '@/store';
import type { CommonPost } from '@/store';
import Card from 'primevue/card';
import Divider from 'primevue/divider';
import { onMounted, ref, type Ref } from 'vue';

defineProps<{
  itemIndex?: number,
  data: CommonPost
}>()

const cardRef: any = ref(null);
const showModal = ref(false)

const expandCard = (evt:Event) =>  {
  (cardRef.value as HTMLElement).classList.toggle('active')};

</script>

<template >
  <div ref="cardRef" v-if="data != null" id="" class="local-card">
    <img :src="data.featured? data.featured.length == 0 ? '/logo incompleta verde.png': '/logo incompleta verde.png': '/logo incompleta verde.png'">
    <div class="content">
      <router-link :to="BaseLinks.CommonPost + data.id" v-tooltip.top="'Vá para a publicação'"
        class="waves-effect waves-block waves-light"> {{ data.title }}
      </router-link>
      <p v-html="data.excerpt.substring(0,150)"></p>
      <small v-html="data.data"></small>
    </div>
  </div>
</template>

<style lang="scss">
.local-card{
  width: 100%;
  display: flex;
  gap: 5px;

  @media (max-width: 500px)   {
    flex-wrap: wrap;
    border-bottom: 1px solid #cecece;
    border-top: 1px solid #cecece;
  }
  
  img{
    width: 250px;
    object-fit: contain;
    height: 100%;
  }
}

</style>