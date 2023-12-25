<script lang="ts" setup>
import { type CommonPost } from '@/store';
import { onMounted, ref } from 'vue';
import Card from './Card.vue';


defineProps<{
   storeData: CommonPost[],
   title: string,
   vejamais: string|boolean,
   perrow?: number
}>()
const windowWidth = ref(window.innerWidth)
onMounted(() => {
  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth
  })
})

</script>

<template>
    <div id="grade_items" class="container">
        <h4 v-if="title">
            {{ title }}
          <Divider />
        </h4>
        <div class="grade row container" :style="`grid-template-columns: repeat(${perrow? perrow: 2}, 1fr)`">
          <Card :data="data" :id="'card_'+data.id" :itemIndex="index" v-for="data,index of storeData"> 
          </Card>
  
        </div>
       
        <router-link v-if="(typeof vejamais == 'string')" :to="vejamais" class="p-button">Veja mais</router-link>
      
      </div>
</template>

<style lang="scss" scoped>
@import '../vars.scss';

.p-button{
  width: 10em;
  margin-inline: auto;
  display: flex;
  justify-content: center;
}

#grade_items {
    min-width: 92%;
    display: grid;
    gap: 3em;
    padding: 0px;
    margin-top: 0px;

    divider {
      height: 2px;
      background: $cs3;
      opacity: 0.4;
      width: 100%;
      margin-inline: auto;
    }
  
    .grade {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 25px;
      width: 100%;
      @media (max-width: 500px) {
        display: flex;
  flex-direction: column;
      }
      .card {
        min-width: 270px;
        max-width: 100vw;
        margin: 12.5px
      }
      
  
      @media (min-width: 500px) {
        .card {
          width: min-content;
          height: min-content;
        }
      }
    }
  }
</style>