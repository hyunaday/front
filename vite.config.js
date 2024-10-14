import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // 프록시는 로컬 개발 환경에서만 작동합니다.
      '/api': {
        target: 'https://together-pay.store', // 실제 API 서버 URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    open: {
      app: {
        name: "Google Chrome", // 원하는 브라우저 이름
      },
    },
  },
});
