import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // <---
import './static/style.css'
import { createPinia } from 'pinia'


/* createApp(App).use(router).use(createPinia()).mount('#app')
 */

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')