import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { getNodeEnv } from '@rockite/build-utils'

const projectPath = (path: string) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig(({ mode }) => {
  const env = getNodeEnv();

  const isProd = env === 'production';
  // const isBuild = mode === 'build';

  console.log({mode, env});

  return {
    root: projectPath('src'),
    publicDir: projectPath('public'),
    envDir: projectPath('.'),
    envPrefix: 'ROCKITE_',
    build: {
      emptyOutDir: true,
      assetsDir: 'assets',
      minify: isProd && 'terser',
      cssMinify: isProd && 'lightningcss',
      reportCompressedSize: false,
      outDir: projectPath('dist'),
      sourcemap: true,
      rollupOptions: {
        input: {
          index: projectPath('src/index.html'),
        },
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
      }),
      tsconfigPaths(),
    ],
  }
})
