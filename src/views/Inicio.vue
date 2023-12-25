<script setup lang="ts">
import { ref } from "vue";
import Carousel from 'primevue/carousel';
import { api_cats, store } from '@/store'
import { BaseLinks } from '@/store';
import { router } from "@/main";
import CardGrid from "@/components/CardGrid.vue";


const responsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '1199px',
    numVisible: 3,
    numScroll: 1
  },
  {
    breakpoint: '767px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '575px',
    numVisible: 1,
    numScroll: 1
  }
]);

</script>

<template>
  <main>
    <header class="container">
      <n-carousel id="header-carousel" trigger='hover' draggable autoplay>
        <div class='carouselWrapper' v-for="data, index of store.detaques" v-tooltip.top="'Vá para a publicação'"
          v-on:click="router.push(BaseLinks.CommonPost + data.id)">
          <img :alt="data.title" class="carousel-img" :src="data.featured || 'https://picsum.photos/id/1/300/200'" />

          <div class="content">
            <h4 class="mb-1">{{ data.title }}</h4>
            <h6 class="mt-0 mb-3" v-html="data.excerpt"></h6>
            <small v-html="data.data"/>
          </div>
        </div>

        <template #arrow="{ prev, next }">
          <div class="custom-arrow">
            <button type="button" class="custom-arrow--left" @click="prev">
              <n-icon>
                <ArrowBack />
              </n-icon>
            </button>
            <button type="button" class="custom-arrow--right" @click="next">
              <n-icon>
                <ArrowForward />
              </n-icon>
            </button>
          </div>
        </template>
        <template #dots="{ total, currentIndex, to }">
          <ul class="custom-dots">
            <li v-for="index of total" :key="index" :class="{ ['is-active']: currentIndex === index - 1 }"
              @click="to(index - 1)" />
          </ul>
        </template>
      </n-carousel>
      <div class="more">
        <div>
          <img v-on:click="router.push('/categorias/'+api_cats.fme)" class="pointer waves-effect waves-block waves-light "
            src="../assets/banner-FME.png" alt="">
          <img v-on:click="router.push('/categorias/'+api_cats.galerias)" class="pointer waves-effect waves-block waves-light "
            src="../assets/banner-galeria-de-fotos.png" alt="">
        </div>
      </div>
    </header>

    <Carousel v-if="store.banners.length>0" class="container" id="banners-carousel" :value="store.banners" :numVisible="1" :numScroll="3"
      :responsiveOptions="responsiveOptions">
      <template #item="slotProps">
        <img v-if="slotProps.data.featured" :src="slotProps.data.featured" :alt="slotProps.data.title.rendered"
          class="container" />
      </template>
    </Carousel>

    <CardGrid :storeData="store.noticias.splice(0,4)" :title="''" :vejamais="'categorias/8'">
    </CardGrid>


  </main>
</template>


<style lang="scss" scoped>
@import '../vars.scss';

.card {
  width: 100%;
}

[aria-hidden] {
  display: block !important;
}
.carouselWrapper{
  display: grid;
  grid-template-columns: 400px auto;
  min-height: 400px;
  gap: 1em;
  margin-right: 1em;
  @media(max-width:500px){
    display:flex;
    flex-direction: column-reverse;
  margin-top: 1em;
  }
}
.card .card-image .card-title {
  a {
    color: #fff;
  }

  z-index: 10;
  font-size: 12pt;
}

.card .card-image img {
  height: 37vh;
  object-fit: cover;
}

main {
  &>* {
    border-radius: 20px;
    padding: 3em;
  }
}

.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
}

header {
  display: grid;
  grid-template-columns: auto 400px;
  padding-inline: 3em;
  box-shadow: none;
  background-color: #fff;
  padding: 0;
  height: max-content;
  gap: 1vh;
  margin-top: 1em;


  .more {
    display: grid;

    h4 {
      text-align: center;
      font-size: 16pt;
      color: #333333c7
    }

    &>div {
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-direction: column;
      gap: 1vh;
      height: min-content;

      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }

  }

  @media (min-width: 763px) and (max-width: 1200px) {
    .more {
      margin-top: 12em;
    }
  }

  @media (max-width: 763px) {
    grid-template-rows: auto;
    display: grid;
    grid-template-columns: 100%;
    margin-top: 0em;
    width: 100vw;

    .p-carousel-indicators {
      left: 2em;
      position: absolute;
      bottom: 0;

      @media (max-width: 500px) {
        position: relative;
        width: 70vw;
        margin-inline: auto;
        gap: 1.7rem;
      }
    }

    .more {
      padding: 1em;
      gap: 1em;

      div {
        grid-template-columns: 50% 50%;
        grid-template-rows: auto;
        display: grid;
        width: 100%;

        img {
          height: auto;
          width: 100%;

        }
      }
    }
  }
}

#header-carousel {
  border: #333 10px;

  .p-carousel-indicators {
    left: 2em;
    position: absolute;
    bottom: 0;
  }

  .content {
    display: block;
    width: 100%;
    position: relative;
    z-index: 100;
    bottom: 0em;
    color: rgba(51, 51, 51, 0.7803921569);

    @media (max-width: 500px) {
      padding: 1em;
    }

    h4 {
      font-weight: bold;
      font-size: 140%;
      color: #222;
    }
  }

  @media (max-width: 500px) {
    position: relative;
    width: 100%;
    margin-inline: auto;
    gap: 1.7rem;
    height: min-content;
  }

  h4 {
    font-size: 18pt;
  }
}


.p-carousel-item {
  overflow-y: visible;
  width: 100%;
  cursor: pointer;

  &:first-child {
    min-height: calc(60vh + 0.3em);
  }

  &>div {
    color: white;
    font-family: Glober;
    display: flex;
    flex-direction: column;
    padding: 13px;
    padding-inline: 16px;

    h4 {
      font-size: 24px;
      text-shadow: 0px 0px 4px #333;
      text-shadow: none;
      color: #333;
      font-weight: unset;
    }

    h6 {
      font-size: 1.15rem;
      line-height: 110%;
      margin: 0.7666666667rem 0 0.46rem 0;
    }

    p {
      text-shadow: none;
      color: #333333c7;
    }

    @media (max-width: 500px) {
      height: auto;
    }

    display: flex;

    .cover {
      width: 100%;
      position: absolute;
      height: 100%;
      left: 0;
      top: 0;
      overflow: hidden;
      display: flex;
      justify-content: center;

      img {
        width: 110%;
        position: absolute;
        z-index: -1;
        filter: blur(1px) brightness(0.9);

        @media (max-width: 500px) {
          width: auto;
          filter: blur(0px) brightness(1);
          position: relative;
          height: 100%;
        }

        object-fit: cover;
        top: -5px;
        left: -5px;
        transition: all 0.15s ease;
      }
    }

  }
}

@media only screen and (min-width: 993px) {
  .container {
    width: 85% !important;
  }
}

#banners-carousel {
  padding: 0% !important;
  width: calc(85% + 35px) !important;
  margin-bottom: 3em;
  margin-inline: auto;
  transform-origin: center;
  max-width: calc(1280px + 60px);

  img {
    transform-origin: center;
    object-fit: cover;
    width: 100% !important;
    margin-inline: auto;
    max-height: 200px;
  }
}
</style>