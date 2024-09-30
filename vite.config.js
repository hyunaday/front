import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://34.64.141.174:8080/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // 여기를 수정
      }
    }
  }
})
