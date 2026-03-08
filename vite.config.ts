import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Injects index.scss (variables only, no CSS rules) into every component
        // so @use '@/styles/index.scss' is not needed in each component style block.
        additionalData: `@use 'index' as *;\n`,
        loadPaths: [path.resolve(__dirname, 'src/styles')],
      },
    },
  },
  server: {
    allowedHosts: ['08c6a4034b0d.ngrok-free.app'],
  },
})
