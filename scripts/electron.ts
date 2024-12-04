import fs from "node:fs";
import { execSync } from "node:child_process";

const workingDir = process.cwd();
const buildDir = `${ workingDir }/build`;

const removeFiles = ['service-worker.js', 'robots.txt', 'manifest.json'];

removeFiles.forEach(
  file => fs.unlinkSync(`${ buildDir }/${ file }`)
);

execSync('cp -r public-electron/. build');
execSync('cd build && yarn');

