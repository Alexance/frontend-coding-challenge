import { createRouter, createWebHistory } from "vue-router";

import FccHome from "@/views/FccHome.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: FccHome,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
