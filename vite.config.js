import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/cinema-system/',  // 必须与你的仓库名一致
  build: {
    outDir: 'dist',         // ✅ 明确指定输出目录（必须与 Cloudflare 设置一致）
    assetsDir: 'assets',    // ✅ 静态资源子目录（可选，但建议明确）
    emptyOutDir: true       // ✅ 构建前清空输出目录（避免旧文件残留）
  }
})
