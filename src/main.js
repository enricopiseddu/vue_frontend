import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // <---
import './static/style.css'
import { createPinia } from 'pinia'
import 'bootstrap/dist/css/bootstrap.css'

const app = createApp(App)


app.use(createPinia())
app.use(router)


app.mount('#app')