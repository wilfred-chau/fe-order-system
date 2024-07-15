import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css"; // 修改这里的路径

const app = createApp(App);

app.use(store);
app.use(router);
app.use(ElementPlus);

app.mount("#app");
