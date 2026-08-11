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
  build: {
    // The Spline runtime ships large lazy sub-chunks (physics, opentype, navmesh)
    // that are only fetched once the 3D scene mounts, so they never block first
    // paint. Limit is set just above the biggest of them to keep the warning
    // meaningful for first-party code.
    chunkSizeWarningLimit: 2048,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Framework runtime in its own long-lived chunk. Spline is left to
          // Vite's own dynamic-import splitting — grouping it would merge those
          // lazy sub-chunks back into one 4.5 MB file.
          if (!id.includes('node_modules')) return
          if (/node_modules\/(vue|@vue|pinia|vue-router|vue-i18n|@intlify)\//.test(id))
            return 'vue-vendor'
          return
        },
      },
    },
  },
  server: {
    allowedHosts: ['08c6a4034b0d.ngrok-free.app'],
  },
})
