import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'
import cjs from 'rollup-plugin-cjs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      exportAsDefault: false,
      svgrOptions: {
        svgo: true,
        expandProps: 'end',
        svgoConfig: {
          plugins: [
            'removeViewBox',
          ]
        }
      }
    }),
    tsconfigPaths(),
  ],
  server: {
    port: 8080,
  },
  build: {
    outDir: './dist',
    sourcemap: true,
    rollupOptions: {
      plugins: [cjs()],
    },
  },
  // [DON'T DELETE - IT MAY BE USEFUL as example UNTIL WE'RE USING SASS/SCSS]
  // if you wanna customize
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@import "./src/style/settings";`
  //     }
  //   }
  // }
})
