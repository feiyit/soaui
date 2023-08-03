import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import router from "./router";
import store from "./store";
import * as Icons from "@element-plus/icons-vue";

import "element-plus/dist/index.css";
import "uno.css";
import "@/style/style.scss";

const app = createApp(App);

app.use(ElementPlus).use(store).use(router).mount("#app");

for (const [key, component] of Object.entries(Icons)) {
  app.component(key, component);
}
