import { createRouter, createWebHistory } from "vue-router";
import LoginRegisterPage from "../views/LoginRegisterPage.vue";
import OrderPage from "../views/OrderPage.vue";

const routes = [
  { path: "/", redirect: "/login" }, // 根路径重定向到登录页面
  { path: "/login", component: LoginRegisterPage }, // 登录页面路由
  { path: "/register", component: LoginRegisterPage }, // 可选：如果还想保留 /register 路由
  { path: "/order", component: OrderPage }, // 订单页面路由
];

const router = createRouter({
  history: createWebHistory(), // 使用 HTML5 History 模式
  routes, // 路由配置
});

export default router;
