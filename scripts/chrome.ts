import fs from "node:fs";
import { execSync } from "node:child_process";

const workingDir = process.cwd();
const buildDir = `${ workingDir }/build`;

const removeFiles = ['robots.txt', 'manifest.json'];

removeFiles.forEach(
  file => fs.unlinkSync(`${ buildDir }/${ file }`)
);

execSync('cp -r public-chrome/. build');

execSync('rm chrome-build.zip || true');

execSync('zip -vr chrome-build.zip build/* -x "*.DS_Store"');