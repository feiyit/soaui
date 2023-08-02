import * as VueRouter from "vue-router"
import { useUserStore } from "@/store/modules/user"
import { ElNotification } from 'element-plus';

import NProgress from "nprogress"
import "nprogress/nprogress.css"

NProgress.configure({ showSpinner: false })

//系统特殊路由
const routes_404 = {
	path: "/:pathMatch(.*)*",
	hidden: true,
	component: () => import(/* webpackChunkName: "404" */ '@/layout/other/404'),
}

const routes = [
  {
		name: "layout",
		path: "/",
		component: () => import('@/layout/index.vue'),
	},
  // {
  //   path: "/",
  //   component: () => import("../views/index.vue"),
  // },
  {
    path: "/login",
    component: () => import("../views/login/index.vue"),
  },
  {
    path: "/404",
    component: () => import("@/layout/other/404.vue"),
  },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

router.beforeEach(async (to, _from, next) => {
  const userStore = useUserStore();
  console.log('user',userStore.user)
  console.log(to)
  console.log(_from)
  console.log(next)
  NProgress.start()

  if(to.path === "/login" && !userStore.user){
		//删除路由(替换当前layout路由)
		//router.addRoute(routes[0])
		next();
		return false;
	}

  if(to.path === "/login" && userStore.user){
    next("/");
		return false;
  }

  if(!userStore.user){
    next("/login")
		return false;
	}

  //整页路由处理
	if(to.meta.fullpage){
		to.matched = [to.matched[to.matched.length-1]]
	}

  console.log("1111");

  next()
  NProgress.done()
})

router.afterEach(() => {
  NProgress.done()
})
router.onError((error) => {
	NProgress.done();
	ElNotification.error({
		title: '路由错误',
		message: error.message
	});
});
export default router;

// export default VueRouter.createRouter({
//   history: VueRouter.createWebHashHistory(),
//   routes,
// });