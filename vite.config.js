import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';


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
        // includePaths aiuta sass a risolvere import senza dover sempre mettere percorsi relativi
        includePaths: [path.resolve(__dirname, 'src/styles')],
        additionalData: `
        @use "sass:color";
        @use "abstracts/index" as *;
        `
      }
    }
  }
});