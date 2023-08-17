import { UserConfig, ConfigEnv, loadEnv, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path, { resolve } from "path"
import { createHtmlPlugin } from "vite-plugin-html"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import UnoCSS from "unocss/vite";

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
// })
const pathSrc = path.resolve(__dirname, "src");
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());
  return {
    // dev 独有配置
    resolve: {
      alias: {
        "@": pathSrc,
      },
    },
    server: {
      host: "0.0.0.0",
      port: Number(env.VITE_APP_PORT),
      open: true,
      /** 跨域设置允许 */
      cors: true,
    },
    build: {
      outDir: env.VITE_OUT_DIR,
      /** 消除打包大小超过 500kb 警告 */
      chunkSizeWarningLimit: 2000,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ["console.log"],
        },
        format: {
          /** 删除注释 */
          comments: false,
        },
      },
      /** 打包后静态资源目录 */
      assetsDir: "static",
      minify: "terser",
      rollupOptions: {
        output: {
          chunkFileNames: "js/[name]-[hash].js", // 分类输出
          entryFileNames: "js/[name]-[hash].js",
          assetFileNames: "[ext]/[name]-[hash].[ext]",
          manualChunks(id) {
            if (id.includes("node_modules")) {
              // 超大静态资源拆分
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
        },
      },
    },
    plugins: [
      vue(),
      UnoCSS(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/icons/svg")],
        symbolId: "icon-[dir]-[name]",
      }),
      createHtmlPlugin({
        // template: 'public/index.html',
        inject: {
          data: {
            title: env.VITE_APP_TITLE,
          },
        },
      }),
    ],
  };
});