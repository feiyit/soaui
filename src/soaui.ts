import { type App } from "vue";
import config from "./config";
// import api from "./api";
import tool from "./utils/tool";
import http from "./utils/request";
import { permission, rolePermission } from "./utils/permission";

import auth from "./directives/auth";
import auths from "./directives/auths";
import errorHandler from "./utils/errorHandler";

export default {
  install: (app) => {
    //挂载全局对象
    app.provide("CONFIG", config);
    app.config.globalProperties.$CONFIG = config;
    app.provide("TOOL", tool);
    app.config.globalProperties.$TOOL = tool;
    app.provide("HTTP", http);
    app.config.globalProperties.$HTTP = http;
    // app.provide("API", api);
    // app.config.globalProperties.$API = api;
    app.config.globalProperties.$AUTH = permission;
    app.config.globalProperties.$ROLE = rolePermission;

    //注册全局指令
    app.directive("auth", auth);
    app.directive("auths", auths);

    //全局代码错误捕捉
    //app.config.errorHandler = errorHandler;
  },
};
