import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/cinema-system/',  // 必须与你的仓库名一致
  build: {
    outDir: 'dist'
  }
})
