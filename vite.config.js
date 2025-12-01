import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
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