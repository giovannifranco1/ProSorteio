import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import router from './router'
import VueTheMask from 'vue-the-mask'
import cookie from "js-cookie";
import api from './services/api.js';

const app = createApp(App);
app.config.globalProperties.$api = api;
app.config.globalProperties.$cookie = cookie;
app.use(router)
app.use(VueTheMask, {
  placeholders: {
    '#': null, // passing `null` removes default placeholder, so `#` is treated as character
    D: /\d/, // define new placeholder
    Я: /[\wа-яА-Я]/, // cyrillic letter as a placeholder
  },
  '#': { pattern: /\d/ },
  'X': { pattern: /[0-9a-zA-Z]/ },
  'S': { pattern: /[a-zA-Z]/ },
  'A': { pattern: /[a-zA-Z]/, transform: v => v.toLocaleUpperCase() },
  'a': { pattern: /[a-zA-Z]/, transform: v => v.toLocaleLowerCase() },
  '!': { escape: true }
});
app.mount('#app')