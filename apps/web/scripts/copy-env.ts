import { execSync } from 'node:child_process'

const fileName = process.argv[process.argv.length - 1]

execSync(`cp ${fileName}.example ${fileName}`)
