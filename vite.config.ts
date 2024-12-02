import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {fileURLToPath} from 'node:url'

const projectPath = (path: string) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  publicDir: projectPath('public'),
  envDir: projectPath('.'),
  envPrefix: 'WSK_',
  build: {
    emptyOutDir: true,
    assetsDir: 'assets',
    minify: 'terser',
    cssMinify: 'lightningcss',
    reportCompressedSize: false,
    outDir: projectPath('dist'),
    rollupOptions: {
      // input: {
      //   index: projectPath('src/index.html'),
      // },
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/chunks/[name]-[hash].js',
        entryFileNames: 'assets/modules/[name]-[hash].js',
      }
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [
          'babel-plugin-macros',
          'babel-plugin-styled-components'
        ],
      }
    })
  ],
})
