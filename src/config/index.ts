const DEFAULT_CONFIG = {
  //版本号
  APP_VER: "1.0.0",

  //应用ID
  APP_KEY: "870cb6cfa286ac4cac462bc8e33b1bb5",

  //参数加密签名Key
  SIGN_KEY: "ab517f95fab7d57",

  //标题
  APP_NAME: import.meta.env.VITE_APP_TITLE,

  //首页地址
  DASHBOARD_URL: "/dashboard",

  //接口地址
  API_URL: import.meta.env.VITE_BASE_API,

  //服务器地址
  SERVER_URL: import.meta.env.VITE_BASE_API,

  //请求超时
  TIMEOUT: 10000,

  //TokenName
  TOKEN_NAME: "accessToken",

  //Token前缀，注意最后有个空格，如不需要需设置空字符串
  TOKEN_PREFIX: "",

  //追加其他头
  HEADERS: {},

  //请求是否开启缓存
  REQUEST_CACHE: false,

  //存储用户加密的key
  AES_KEY: "2XNN4K8LC0ELVWN9",
};
export default DEFAULT_CONFIG;
