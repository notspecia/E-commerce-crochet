import { createApp } from 'vue'
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { i18n } from './i18n'; // import i18n configuration languages
import App from './App.vue';

// routes import from router.js 
import router from './router.js';

// import scss custom main file + bootstrap styles + icons + js interactions
import '@/styles/main.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// activate the Vue app (router + app container main)
const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)
app.use(pinia); // use pinia for global states management
app.use(router); // use router for navigation of pages
app.use(i18n); // use i18n for translations IL CONTENUTO CON $t permette di tradurre i testi in base alla lingua selezionata tramite il file i18n.ts
app.mount('#app');