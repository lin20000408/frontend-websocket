

// import react from '@vitejs/plugin-react'
import react from "@vitejs/plugin-react-swc";

import svgr from "vite-plugin-svgr";

import { VitePWA } from "vite-plugin-pwa";
import viteCompression from "vite-plugin-compression";
import { defineConfig } from 'vitest/config';
// import legacy from "@vitejs/plugin-legacy";

// 导入 dotenv 模块
// import dotenv from 'dotenv';

// 调用 dotenv 的 config 方法加载环境变量
// dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  
  base: "./",
  plugins: [

    react(),
    svgr(),
    viteCompression(),
    VitePWA({
      manifest: {
        name: "myPowrplus",
        description: "Powered by SportsArt",
        theme_color: "#242424",
        icons: [
          {
            src: "/icons/myPowrplus192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/myPowrplus512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      devOptions: {
        // 如果想在`vite dev`命令下调试PWA, 必须启用它
        enabled: true,
        // Vite在dev模式下会使用浏览器原生的ESModule，将type设置为`"module"`与原先的保持一致

        type: "module",
      },
      workbox: {
        // 新增 maximumFileSizeToCacheInBytes 設定
        maximumFileSizeToCacheInBytes: 5000000, // 5MB
      },
    }),
  ],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: new URL("./src", import.meta.url).pathname,
      },
      {
        find: "@@",
        replacement: new URL("./src/.umi", import.meta.url).pathname,
      },
      {
        find: "@root", // 設定 @root 讓它指向 shared/ 或其他 src 之外的資料夾
        replacement: new URL("./", import.meta.url).pathname,
      },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        math: "always",
      },
    },
  },
  // code-splitting 代碼分割
  build: {
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      input: {
        main: new URL("./index.html", import.meta.url).pathname,
      },
      output: {
        // 启用文件名哈希
        entryFileNames: "[name]-[hash].js",
        chunkFileNames: "[name]-[hash].js",
        assetFileNames: "[name]-[hash][extname]",
        // 分包策略 (把一些不常規更新的文件, 進行單獨打包處理))
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            return "vender";
          }
        },
      },
    },
  },
  // 使用 import.meta.env 访问环境变量
  // define: {
  //   'import.meta.env': JSON.stringify(process.env)
  // },

  // 改變port=3000 是為了reactjs-social-login
  server: {
    host: "0.0.0.0",
    port: 3000,
    open: true,
  }, test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts', // 設置全局測試配置
  },
  
});
