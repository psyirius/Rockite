import { execSync } from 'node:child_process'
import fs from 'node:fs'

const workingDir = process.cwd()
const buildDir = `${workingDir}/build`

const removeFiles = ['service-worker.js', 'robots.txt', 'manifest.json']

for (const file of removeFiles) {
  fs.unlinkSync(`${buildDir}/${file}`)
}

execSync('cp -r public-electron/. build')
execSync('cd build && yarn')
