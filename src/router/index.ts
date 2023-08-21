import { reactive } from "vue";
import * as VueRouter from "vue-router";
import { useUserStore } from "@/store/modules/user";
import { ElNotification } from "element-plus";
import dynamicRouter from "./dynamic";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });

//系统特殊路由
const routes_404 = {
  path: "/:pathMatch(.*)*",
  hidden: true,
  component: () => import("@/layout/other/404.vue"),
};
let routes_404_r = () => {};
const routes = [
  {
    name: "layout",
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layout/index.vue"),
    children: [],
  },
  // {
  //   path: "/",
  //   component: () => import("../views/index.vue"),
  // },
  {
    path: "/login",
    component: () => import("../views/login/index.vue"),
  },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes,
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
});
var isLoadRouter = false;
router.beforeEach(async (to, _from, next) => {
  const userStore = useUserStore();
  NProgress.start();
  if (to.path === "/login" && !userStore.user) {
    //删除路由(替换当前layout路由)
    router.addRoute(routes[0]);
    //删除路由(404)
    routes_404_r();
    isLoadRouter = false;
    next();
    return false;
  }

  if (to.path === "/login" && userStore.user) {
    next("/");
    return false;
  }

  if (!userStore.user) {
    next("/login");
    return false;
  }

  //整页路由处理
  if (to.meta.fullpage) {
    to.matched = [to.matched[to.matched.length - 1]];
  }

  //加载动态路由
  if (!isLoadRouter) {
    var menuRouter = filterAsyncRouter(dynamicRouter);
    menuRouter = flatAsyncRoutes(menuRouter);
    menuRouter.forEach((item) => {
      router.addRoute("layout", item);
    });
    routes_404_r = router.addRoute(routes_404);
    if (to.matched.length == 0) {
      router.push(to.fullPath);
    }
    isLoadRouter = true;
  }

  next();
  NProgress.done();
});

router.afterEach(() => {
  NProgress.done();
});
router.onError((error) => {
  NProgress.done();
  ElNotification.error({
    title: "路由错误",
    message: error.message,
  });
});

function filterAsyncRouter(routerMap) {
  const accessedRouters: any[] = [];
  routerMap.forEach((item) => {
    item.meta = item.meta ? item.meta : {};
    //处理外部链接特殊路由
    if (item.meta.type == "iframe") {
      item.meta.url = item.path;
      item.path = `/i/${item.name}`;
    }
    //MAP转路由对象
    var route = {
      path: item.path,
      name: item.name,
      meta: item.meta,
      redirect: item.redirect,
      children: item.children ? filterAsyncRouter(item.children) : null,
      component: resolveComponent(item.component),
    };
    accessedRouters.push(route);
  });
  return accessedRouters;
}

const pages = import.meta.glob("@/views/**/*.vue");
const resolveComponent = (name: any) => {
  const importPage = pages[`/src/views/${name}.vue`];
  if (!importPage) {
    return () => import(`@/layout/other/empty.vue`);
  }
  return importPage;
};

function flatAsyncRoutes(routes, breadcrumb = []) {
  let res = reactive([]);
  routes.forEach((route) => {
    const tmp = { ...route };
    if (tmp.children) {
      let childrenBreadcrumb = [...breadcrumb];
      childrenBreadcrumb.push(route);
      let tmpRoute = { ...route };
      tmpRoute.meta.breadcrumb = childrenBreadcrumb;
      delete tmpRoute.children;
      res.push(tmpRoute);
      let childrenRoutes = flatAsyncRoutes(tmp.children, childrenBreadcrumb);
      childrenRoutes.map((item) => {
        res.push(item);
      });
    } else {
      let tmpBreadcrumb = [...breadcrumb];
      tmpBreadcrumb.push(tmp);
      tmp.meta.breadcrumb = tmpBreadcrumb;
      res.push(tmp);
    }
  });
  return res;
}

export default router;
