# <div style="text-align:center">SOAUI</div>

基于 Vue 3、Vite、TypeScript、Pinia 和 Vue Router 高可用的前端管理框架。

## 项目依赖

在开始之前，请确保你已经安装了以下依赖：

- [Node.js](https://nodejs.org/)
- [Vue CLI](https://cli.vuejs.org/)
- [Pinia](https://pinia.esm.dev/)
- [Vue Router](https://router.vuejs.org/)
- [axios](https://www.axios-http.cn/)

## 项目设置

首先，克隆这个仓库并安装依赖：

```bash
git clone https://github.com/feiyit/soaui.git
cd soaui
pnpm install
```

## 运行项目
运行以下命令以在本地启动开发服务器：
```bash
pnpm dev
```


## 项目结构说明

- `src/`：项目源代码的根目录。
  - `api/`：存放读取api访问配置。

  - `assets/`：存放静态资源文件的目录，例如图片、样式、字体等。

  - `components/`：包含 Vue 组件的目录，可以按功能或模块组织。

  - `config/`：系统的全局配置以及组件配置。

  - `directives/`：权限指令的相关配置。

  - `icons/`：icon图标的配置，支持阿里svg图标。

  - `layout/`：系统框架布局文件。

  - `router/`：路由相关配置，包括静态路由、动态路由。

  - `store/`：状态管理的相关配置。

  - `style/`：样式相关配置。

  - `utils/`：工具箱：包括数据请求封装、加解密等一些常用工具。

  - `views/`：页面视图组件的目录，通常用于路由视图组件。

  - `App.vue`：根组件，是应用的入口。

  - `main.ts`：项目的入口文件，初始化 Vue 应用。

- `package.json`：项目依赖和脚本配置文件，包括项目名称、依赖列表和自定义脚本。

- `vite.config.js`：Vite 构建工具的配置文件，用于配置开发服务器、构建选项等。

- `tsconfig.json`：TypeScript 配置文件，用于配置 TypeScript 编译选项和类型检查。


