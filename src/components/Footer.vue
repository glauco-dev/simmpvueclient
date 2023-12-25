<script setup lang="ts">
import Logo from '@/assets/logo incompleta verde.png';
</script>
<template>
  <footer class="page-footer">
    <div class="container">
      <div class="row">
        <div class="col l4 s12">
          <img :src="Logo" width="250px" />
        </div>
        <div style="color: #333;justify-content: center;display: flex;" class="col l8 s12"> SIMMP - Sindicato do
          Magistério Municipal Público de Vitória da Conquista Endereço: Av. Presidente Vargas, 335 - Alto Maron CEP
          45045-010 Fone: (77) 3424-3698 / 3422-7858 </div>
      </div>
    </div>
    <div class="footer-copyright">
      <div class="container">
        © 2023 Todos os direitos reservados
      </div>
    </div>
  </footer>
</template>  

<style lang="scss">
@import '../vars.scss';

footer {
  margin-top: 6em;
  background-color: #e4e4e4 !important;
  position: absolute;
  bottom: 0;
  width: 100%;
  h5,
  a {
    color: #3333338e !important;
  }
}
</style>