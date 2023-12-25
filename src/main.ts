
import { createApp } from 'vue'
import App from './App.vue'
import {createRouter} from './router'
import PrimeVue from 'primevue/config';
import Tooltip from 'primevue/tooltip';
import { createAuth0 } from "@auth0/auth0-vue";
import authConfig from "./router/auth_config.json";
import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';
import hljsVuePlugin from "@highlightjs/vue-plugin";
import Naive from 'naive-ui';
// import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import ToastService from 'primevue/toastservice';

// Construção da aplicação
const app = createApp(App)

app.directive('tooltip', Tooltip);
app.use(PrimeVue)

export const router = createRouter(app);

export const toggleLoading = () => {
    document.body.classList.toggle('blurred');
    document.querySelector('#loadingSpinner')?.classList.toggle('hidden');
}

app
.use(hljsVuePlugin)
.use(router)
.use(Naive)
.use(ToastService)
// .use(VueMaterial)

app.mount('#app')
