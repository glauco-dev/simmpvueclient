<script setup lang="ts">
import Logo from '@/assets/logo completa branca.png';
import { links } from '../store';

import Cookie from 'cookie.js';
const user = Cookie.get('simmp');

const logout = () => {
    Cookie.remove('simmp');
    window.location.assign('/login');
}
</script>
<template>
    <nav>
        <div class="nav-wrapper">
          <router-link to="/" class="brand-logo">
            <img :src="Logo" alt="" id="logo">
          </router-link>
          <router-link to="#" data-target="mobile-demo" class="sidenav-trigger">
            <i class="material-icons">
              menu
            </i>
          </router-link>
          <ul id="nav-mobile" class="left hide-on-med-and-down">
            <li  v-for="link,index of links" :key="link.name + index">
              <router-link v-if="(link.path=='/afiliado' && user)" to="/afiliado/u">
                Afiliado
              </router-link>
              <!-- @vue-ignore -->
              <router-link v-else-if="link.path " :to="link.path">
                {{link.name}}
              </router-link>
    
              <a v-if="link.links" class="dropdown-trigger" href="#" :data-target="'dropdown-' + link.name">
                {{ link.name }}
              </a>
    
              <ul v-if="link.links" :id="'dropdown-' + link.name" class="dropdown-content">
                <li v-for="sublink, index of link.links" :key="'sublink' + + index">
                  <!-- @vue-ignore -->
                  <router-link :to="sublink.path">
                    {{sublink.name}}
                  </router-link>
                </li>
              </ul>
            </li>
            <li v-if="!user">
              <router-link to="/login" v-tooltip.top="'Logar como afiliado'"><i class="fa-solid fa-address-card"></i></router-link>
            </li>
            <li v-else style="display:flex">
              <router-link to="/afiliado" v-tooltip.top="'Carteirinha de Associado'"><i class="fa-solid fa-address-card"></i></router-link>
              <router-link to="#" v-on:click="logout" v-tooltip.top="'Encerrar sessão'"><i class="fa-solid fa-right-to-bracket"></i></router-link>
            </li>
          </ul>
        </div>
      </nav>
    
      <ul class="sidenav collapsible" id="mobile-demo">
        <div>

          <li v-for="link,index of links" :key="link.name + index"   class="collection-item">
            <div  v-if="(link.path=='/afiliado' && user)">
              <router-link to="/afiliado/u">
                Afiliado
              </router-link>
            </div>
            <div v-else-if="link.path"  class="collection-item">
              <router-link :to="link.path">
                {{ link.name }}
              </router-link>
            </div>
            <div v-else>
              <div class="collapsible-header" href="#">
                {{ link.name }}
              </div>
            </div>
            <div v-if="link.links" class="collapsible-body">
              <ul class="collection">
                <li v-for="sublink, index of link.links" :key="'sublink_sidebar_' + index"  class="collection-item">
                  <!-- @vue-ignore -->
                  <router-link :to=sublink.path>
                    {{ sublink.name }}
                  </router-link>
                </li>
              </ul>
            </div>
  
            
          </li>
        </div>

        <li v-if="!user" class="collection-item">
            <router-link to="/login" v-tooltip.top="'Logar como afiliado'"><i class="fa-solid fa-address-card"></i></router-link>
        </li>
        <li v-else class="collection-item" id="icons-actions">
          
          <router-link to="/afiliado" v-tooltip.top="'Carteirinha de Associado'"><i class="fa-solid fa-address-card"></i></router-link>
          <router-link to="#" v-on:click="logout" v-tooltip.top="'Encerrar sessão'"><i class="fa-solid fa-right-to-bracket"></i></router-link>
          
        </li>
    
      </ul>
    
</template>

<style lang="scss">
@import  '../vars.scss';


nav {
    position: sticky;
    background-color: $verde1;
    background-color: #108212d0;
    border-bottom: 1px solid rgba(238, 238, 238, 0.3);
    top: 0px;
    z-index: 1000;
    backdrop-filter: blur(10px);
  }
  
  .sidenav{
    top: 4em !important;
        height: 100%;

  }
  nav .sidenav-trigger {
    position: absolute;
    left: 1em;
  }
  #breadcrumbs{
    position: sticky;
    top: 5em;
    left: 3em;
    width: fit-content;
  }
  
  #nav-mobile{
    margin-left: auto
  }
  .dropdown-content {
    width: 200px !important;
    top: 4.5em !important;
  }
  
  #mobile-demo {
    max-width: 180px;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  }
  
  .brand-logo {
    position: relative;
    height: 100%;
    float: left;
    padding-bottom: 15px !important;
    img {
      height: 95% !important;
    }
  }
  
  nav .nav-wrapper {
    position: relative;
    height: 100%;
    display: flex;
    padding-inline: 3em;
  }
  
  #mobile-demo {
    .collection-item{
      display: flex;
      justify-content: center;
    }
    #icons-actions{
      gap: 2em;
      a {
        i {
          margin: 0 auto;
          font-size: 16pt;
        }
        padding: 0;
        display: block;
        width: fit-content;
      }
    }
  }
  
  
</style>