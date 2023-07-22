import router from "./router";
import { getToken } from "@/utils/auth";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import store from "./store";
import { isRelogin } from "@/utils/request";
import { Message } from "element-ui";

NProgress.configure({ showSpinner: false });

const whiteList = ["/user/login", "/user/register"];

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getToken()) {
    /* 有token*/
    if (to.path === "/user/login") {
      next({ path: "/" });
      NProgress.done();
    } else {
      if (store.getters.name.length === 0) {
        isRelogin.show = true;
        // 拉取user_info信息
        store
          .dispatch("GetInfo")
          .then(() => {
            next();
          })
          .catch((err) => {
            store.dispatch("LogOut").then(() => {
              Message.error(err);
              next({ path: "/" });
            });
          });
      } else {
        next();
      }
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next(`/user/login?redirect=${to.fullPath}`); // 否则全部重定向到登录页
      NProgress.done();
    }
    // console.log(to, from);
    // next();
  }
});

router.afterEach(() => {
  NProgress.done();
});
