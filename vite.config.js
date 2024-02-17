import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import ElementPlus from "unplugin-element-plus/vite";

export default ({ mode }) =>
  defineConfig({
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./"),
        "@": path.resolve(__dirname, "src"),
      },
    },

    base: "./", // 静态资源路径配置
    server: {
      proxy: {
        "/api": {
          target: "http://backend-api-02.newbee.ltd/manage-api/v1", // 凡是遇到 /api 路径的请求，都映射到 target 属性
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""), // 重写 api 为 空，就是去掉它
        },
      },
    },
    css: {
      preprocessorOptions: {
        // 覆盖掉element-plus包中的主题变量文件
        scss: {
          additionalData: `@use "@/styles/element/index.scss" as *;`,
        },
      },
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [
          ElementPlusResolver({
            importStyle: "sass",
          }),
        ],
      }),
      // 用于内部方法调用，样式缺失的现象，如 ElMessage 等
      ElementPlus(),
    ],
  });
