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
