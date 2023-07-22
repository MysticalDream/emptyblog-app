import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import CommonView from "@/views/CommonView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/index",
  },

  {
    path: "/index",
    component: HomeView,
    name: "home",
    children: [
      {
        path: "/",
        component: () => import("@/views/PlayView"),
        name: "PlayView",
      },
      {
        path: "awesome",
        component: () => import("@/views/AwesomeView"),
        name: "AwesomeView",
      },
    ],
  },
  {
    path: "/user/:component",
    name: "CommonView",
    component: CommonView,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
