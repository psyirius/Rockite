import { BuildEntry, defineBuildConfig, MkdistBuildEntry } from 'unbuild'

function dualOutput(
  config: Omit<MkdistBuildEntry, "builder" | "format">
): BuildEntry[] {
  return [
    // esm
    {
      builder: "mkdist",
      format: "esm",
      ext: 'mjs',
      ...config,
    },
    // cjs
    {
      builder: "mkdist",
      format: "cjs",
      ext: 'cjs',
      ...config,
    },
  ];
}

export default defineBuildConfig({
  entries: dualOutput({
    input: "./src/",
  }),
  clean: true,
  sourcemap: true,
  outDir: "dist",
  declaration: true,
  failOnWarn: false,
})