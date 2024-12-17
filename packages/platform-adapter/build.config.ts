import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    "./src/index.ts",
  ],
  clean: true,
  sourcemap: true,
  outDir: "dist",
  declaration: true,
})