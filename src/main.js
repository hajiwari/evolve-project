import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'
import "./firebase";

// Import dev utilities in development
if (import.meta.env.DEV) {
  import('./utils/devUtils.js');
}

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')