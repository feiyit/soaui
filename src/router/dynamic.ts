const routes = [
  {
    name: "home",
    path: "/home",
    meta: {
      title: "首页",
      icon: "ElemeFilled",
      type: "menu",
    },
    children: [
      {
        name: "dashboard",
        path: "/dashboard",
        meta: {
          title: "控制台",
          icon: "Menu",
          affix: true,
        },
        component: "home/index",
      },
      {
        name: "directive",
        path: "/other/directive",
        meta: {
          title: "指令",
          icon: "Flag",
        },
        component: "other/directive",
      },
      {
        path: "https://baidu.com",
        name: "外链百度",
        meta: {
          title: "外链百度",
          icon: "Link",
          type: "link",
        },
      },
      {
        path: "/other/fullpage",
        name: "fullpage",
        meta: {
          title: "整页路由",
          icon: "Monitor",
          fullpage: true,
          hidden: true,
          type: "menu",
        },
        component: "other/fullpage",
      },
    ],
  },
  {
    name: "module",
    path: "/module",
    meta: {
      title: "组件",
      svgIcon: "component",
      type: "menu",
    },
    children: [
      {
        name: "icon",
        path: "/module/icon",
        meta: {
          title: "扩展图标",
          icon: "Football",
          type: "menu",
        },
        component: "module/icon",
      },
      {
        name: "chart",
        path: "/module/chart",
        meta: {
          title: "图表Echarts",
          svgIcon: "zujian",
          type: "menu",
        },
        component: "module/chart",
      },
    ],
  },
  {
    path: "/other/about",
    name: "about",
    meta: {
      title: "关于",
      icon: "InfoFilled",
      type: "menu",
    },
    component: "other/about",
  },
];

export default routes;
