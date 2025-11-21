import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
 

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue({
    template: { transformAssetUrls }
  }),
   // @quasar/plugin-vite options list:
    // https://github.com/quasarframework/quasar/blob/dev/vite-plugin/index.d.ts
    quasar({
      sassVariables: fileURLToPath(
        new URL('./src/quasar-variables.sass', import.meta.url)
      )
    })
],

base: './',

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets'
  },
})
