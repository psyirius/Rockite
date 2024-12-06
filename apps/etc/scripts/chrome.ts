import { execSync } from 'node:child_process'
import * as fs from 'node:fs'

const workingDir = process.cwd()
const buildDir = `${workingDir}/build`

const removeFiles = ['robots.txt', 'manifest.json']

for (const file of removeFiles) {
  fs.unlinkSync(`${buildDir}/${file}`)
}

execSync('cp -r public-chrome/. build')

execSync('rm chrome-build.zip || true')

execSync('zip -vr chrome-build.zip build/* -x "*.DS_Store"')
