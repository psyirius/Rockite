import { defineConfig } from 'tsup'
import { sassPlugin } from 'esbuild-sass-plugin'

export default defineConfig({
  clean: true,
  dts: true,
  entry: [
    'src/**/*.ts',
    'src/**/*.tsx',
    'src/**/*.scss',
  ],
  outDir: 'dist',
  format: ['cjs', 'esm'],
  outExtension: (ctx) => ({ js: (ctx.format === 'cjs') ? '.cjs' : '.mjs' }),
  minify: false,
  sourcemap: true,
  external: ['react', 'react-dom'],
  esbuildPlugins: [sassPlugin()],
})