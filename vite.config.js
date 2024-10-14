import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa'; // PWA 플러그인 임포트

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      srcDir: 'public',
      filename: 'sw.js',
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
        type: 'module',
      },
      manifest: {
        name: '모두의결제',
        short_name: '모두의결제',
        theme_color: '#4DBA87',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/icons/modu-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/modu-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        screenshots: [
          {
            src: '/screenshots/screenshot1.png', // 경로에 맞게 수정
            sizes: '1280x800', // 적절한 사이즈 설정
            type: 'image/png',
            form_factor: 'wide', // 또는 'square'와 같은 다른 값
          },
          {
            src: '/screenshots/screenshot2.png', // 두 번째 스크린샷 추가
            sizes: '1280x800',
            type: 'image/png',
            form_factor: 'wide',
          },
        ],
      },
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://34.64.141.174:8080', // API 서버 주소
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    host: true,
    port: 5173,
  },
});
