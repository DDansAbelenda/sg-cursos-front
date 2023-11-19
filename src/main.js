// main.js
import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import router from './router'; // Ruta al archivo router.js
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
//Icons
import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'
//Viajar a seccion especifica
import VueScrollTo from 'vue-scrollto'

const vuetify = createVuetify({
    components,
    directives,
    iconfont: 'md',
})

const app = createApp(App).use(router).use(vuetify).use(VueScrollTo);

// Configuración global de Axios
axios.defaults.baseURL = 'http://localhost:8000/api';

app.config.globalProperties.$axios = axios;

app.mount('#app');

