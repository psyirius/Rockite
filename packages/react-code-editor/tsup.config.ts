import { defineConfig } from 'tsup'
import { lessLoader } from 'esbuild-plugin-less'

export default defineConfig({
  clean: true,
  dts: true,
  entry: [
    'src/**/*.ts',
    'src/**/*.tsx',
    'src/**/*.less',
  ],
  outDir: 'dist',
  format: ['cjs', 'esm'],
  outExtension: (ctx) => ({ js: (ctx.format === 'cjs') ? '.cjs' : '.mjs' }),
  minify: false,
  sourcemap: true,
  external: ['react', 'react-dom'],
  esbuildPlugins: [lessLoader()],
})