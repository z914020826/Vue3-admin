import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(), // hash 模式
  routes: [
    {
      path: "/",
      name: "index",
      component: import("@/views/Index.vue"),
    },
    {
      path: "/add",
      name: "add",
      component: () => import("@/views/AddGood.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: import("@/views/Login.vue"),
    },
  ],
});

export default router;
