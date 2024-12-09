import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import { createVfm } from "vue-final-modal";
import "vue-final-modal/style.css";

const pinia = createPinia();
const app = createApp(App);

const vfm = createVfm();
app.use(vfm);
app.use(pinia);
app.mount("#app");
