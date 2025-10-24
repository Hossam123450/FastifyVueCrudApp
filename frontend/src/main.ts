// main.js ou main.ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 👈 importe le routeur

createApp(App)
  .use(router)               // 👈 utilise le routeur
  .mount('#app')
