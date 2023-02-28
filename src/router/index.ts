import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import FccHome from "@/views/FccHome.vue";
import FccSearch from "@/views/game/FccSearch.vue";
import FccWinners from "@/views/game/FccWinners.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: FccHome,
    children: [
      {
        path: "",
        name: "Search",
        component: FccSearch,
      },
      {
        path: "winners",
        name: "Winners",
        component: FccWinners,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
