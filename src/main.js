//import { createApp } from 'vue'
import { createApp, markRaw } from 'vue'
import App from './App.vue'
import router from './router' // <---
import './index.css'
import './style/style.css'
import { createPinia } from 'pinia'
    
//createApp(App).use(router).mount('#app')

const pinia = createPinia();
pinia.use(({ store }) => {
    store.router = markRaw(router)
});

const app = createApp(App);

app.use(pinia)
app.use(router)
app.mount('#app')

