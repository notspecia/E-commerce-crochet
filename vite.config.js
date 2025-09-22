import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  // x to enable SCSS globally (variables)
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "@/styles/_colors.scss";
        @import "@/styles/_typography.scss";
        @import "@/styles/_breakpoints.scss";
        @import "@/styles/_animations.scss";
      `
      }
    }
  }
});