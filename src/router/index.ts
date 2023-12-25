import Inicio from '../views/Inicio.vue'
import AfiliadoVue from '@/views/Afiliado.vue'
import AgendaVue from '@/views/Agenda.vue'
import InstitucionalVue from '@/views/Institucional.vue'
import CommonPostVue from '@/views/CommonPost.vue'
import GaleriasVue from '@/views/Galerias.vue'
import CategoriesVue from '@/views/Categories.vue'
import { BaseLinks } from '@/store'
import { createAuthGuard } from "@auth0/auth0-vue";
import AfiliadoAuthVue from '@/views/AfiliadoAuth.vue'
import { createRouter as createVueRouter, createWebHashHistory, createWebHistory } from "vue-router";
import type { App } from 'vue'
import FMEVue from '@/views/FME.vue'
import Login from '@/components/Login.vue';
import Admin from '@/views/Admin.vue';

export function createRouter(app: App) {
  return createVueRouter({
    routes: [
      { path: '/', name: 'Início', component: Inicio },
    { path: '/afiliado', name: 'Afiliação', component: AfiliadoVue },
    { path: '/fme', name: 'FME', component: FMEVue },
    { path: '/login', name: 'Login', component: Login },
    { path: '/admin', name: 'Admin', component: Admin },
      { path: '/galerias', name: 'Galerias', component: GaleriasVue },
      { path: '/afiliado/u', name: 'Afiliação Auth', component: AfiliadoAuthVue },
      { path: '/agenda', name: 'Agenda', component: AgendaVue },
      { path: '/institucional', name: 'Institucional', component: InstitucionalVue },
      { path: BaseLinks.CommonPost+'/:id', name: 'CommonPost', component: CommonPostVue },
      { path: BaseLinks.Categorias+'/:id', name: 'Categories', component: CategoriesVue }
      
    ],
    history: createWebHistory(import.meta.env.BASE_URL)
  })

}
