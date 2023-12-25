<script setup lang="ts">
import {router} from '@/main';

document.querySelectorAll('.share-container .fab').forEach((it) => it.addEventListener('click', event => {
  if (navigator.share) {
    navigator.share({
      title: 'Simmp',
      url: router.currentRoute.value.fullPath
    }).then(() => {
      // console.log('Thanks for sharing!');
    })
      .catch(console.error);
  } else {
    // fallback
  }
}));

function shareCopy() {
  navigator.clipboard.writeText("https://simmp.com.br"+router.currentRoute.value.fullPath)
}

</script>

<template>
  <div class="btn_wrap">
    <span>Compartilhe</span>
    <div class="share-container">
      <a  v-tooltip="'Compartilhe no Facebook'"   data-href="http://simmp.com.br" target="_blank"
        :href="'https://www.facebook.com/sharer/sharer.php?u=http://simmp.com.br'+ router.currentRoute.value.fullPath +'%2F&amp;src=sdkpreparse'"
        class="fb-xfbml-parse-ignore">
        <i class="fab fa-facebook-f"></i>
      </a>
      <a  v-tooltip="'Perfil no instagram'"  data-href="http://simmp.com.br" target="_blank" href="https://www.instagram.com/simmp.sind/"
        class="fb-xfbml-parse-ignore">
        <i class="fab fa-instagram"></i> </a>

      <a v-tooltip="'Compartilhar no Whatsapp'"   data-href="http://simmp.com.br" target="_blank"
        :href="'https://api.whatsapp.com/send?text=http://simmp.com.br' + router.currentRoute.value.fullPath">
        <i class="fa-brands fa-whatsapp"></i>

      </a>
      <i v-tooltip="'Copiar para área de trabalho'"  v-on:click="shareCopy" class="fa-solid fa-copy"></i>

    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../vars.scss';

i {
  opacity: 0;
  font-size: 28px;
  color: $verde2;
  will-change: transform;
  -webkit-transform: scale(.1);
  transform: scale(.1);
  -webkit-transition: all .3s ease;
  transition: all .3s ease;
}

.btn_wrap {
  margin: 2em;
  margin-inline: auto;
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
  width: 200px;
  height: 60px;
  background-color: #EEEEED;
  border-radius: 8px;
  padding: 0 12px;
  will-change: transform;
  -webkit-transition: all .2s ease-in-out;
  transition: all .2s ease-in-out;
}

.btn_wrap:hover {
  /* transition-delay: .4s; */
  -webkit-transform: scale(1.1);
  transform: scale(1.1)
}

span {
  position: absolute;
  z-index: 99;
  width: 240px;
  height: 72px;
  border-radius: 80px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 12pt;
  text-align: center;
  line-height: 70px;
  letter-spacing: 2px;
  color: #EEEEED;
  background-color: $verde1;
  padding: 0 18px;
  -webkit-transition: all 1.2s ease;
  transition: all 1.2s ease;
}

.share-container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: distribute;
  justify-content: space-around;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 240px;
  height: 64px;
  border-radius: 80px;
}

.share-container i:nth-of-type(1) {
  -webkit-transition-delay: 1.1s;
  transition-delay: 1.1s;
}

.share-container i:nth-of-type(2) {
  -webkit-transition-delay: .9s;
  transition-delay: .9s;
}

.share-container i:nth-of-type(3) {
  -webkit-transition-delay: .7s;
  transition-delay: .7s;
}

.share-container i:nth-of-type(4) {
  -webkit-transition-delay: .4s;
  transition-delay: .4s;
}

.btn_wrap:hover span {
  -webkit-transition-delay: .25s;
  transition-delay: .25s;
  -webkit-transform: translateX(-280px);
  transform: translateX(-280px)
}

.btn_wrap:hover i {
  opacity: 1;
  -webkit-transform: scale(1);
  transform: scale(1);
}


.dr {
  position: absolute;
  bottom: 16px;
  right: 16px;
  width: 100px;
}
</style>