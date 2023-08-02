import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from "element-plus"
import router from "./router"
import store from './store';

import "element-plus/dist/index.css"
import "uno.css"

const app = createApp(App)
app.use(ElementPlus).use(store ).use(router).mount('#app')

