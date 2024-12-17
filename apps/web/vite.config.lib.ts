import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import tsconfigPaths from 'vite-tsconfig-paths'
import {fileURLToPath} from 'node:url'
import { peerDependencies } from './package.json'

const projectPath = (path: string) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'

  return {
    publicDir: projectPath('public'),
    envDir: projectPath('.'),
    envPrefix: 'ROCKITE_',
    build: {
      emptyOutDir: true,
      outDir: projectPath('out'),
      minify: isProduction && 'terser',
      cssMinify: isProduction && 'lightningcss',
      reportCompressedSize: false,
      sourcemap: true,
      lib: {
        entry: projectPath('src/index.ts'),
        // name: 'rockite',
        formats: ['es'],
        fileName: 'app-core',
        cssFileName: 'app-core',
      },
      rollupOptions: {
        external: Object.keys(peerDependencies),
        output: {
          globals: {
            'react': 'React',
            'react-dom': 'ReactDOM',
          },
        },
      }
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
      dts({
        exclude: [
          '**/*.test.tsx',
          '**/*.test.ts',
          '**/*.stories.tsx',
          '**/*.stories.ts'
        ],
      }),
    ],
  }
})
