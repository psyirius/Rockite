import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { program } from 'commander'
import moment from 'moment'
import slugify from 'slugify'

const projectPath = (p: string) => fileURLToPath(new URL(path.join('..', p), import.meta.url))

const MIGRATIONS_ROOT = projectPath('src/redux/migrations')
const MIGRATION_TEMPLATE = `
import type { Migration } from '@/types/migration'

export default {
  id: <@ ID @>,
  execute: (state: any) => {
    // state: is the current state of the app
    // write your migration here
    // return the new state

    return {
      ...state,
    }
  },
} satisfies Migration
`

const generateNameSeries = (name: string) => {
  const now = moment()

  return [
    now.format('YYYY-MM-DD-hhmmss'),
    slugify(name, {
      replacement: '-',
      strict: true,
      lower: true,
      trim: true,
    }),
  ].join('-')
}

const generateMigration = (name: string, dry = false) => {
  const id = generateNameSeries(name)
  const filename = [id, 'ts'].join('.')

  const source = MIGRATION_TEMPLATE.replace('<@ ID @>', JSON.stringify(id)).trim()

  const outputPath = path.join(MIGRATIONS_ROOT, filename)

  if (dry) {
    fs.writeFileSync(outputPath, source)
  }

  return outputPath
}

program
  .version('1.0.0')
  .argument('<name>', 'name of the migration')
  .option('-d, --dry', 'dry run')
  .action((name, options) => {
    const outputPath = generateMigration(name)

    console.log(
      options.dry ? 'Would have generated migration at:' : 'Generated migration at:',
      path.relative(process.cwd(), outputPath),
    )
  })

program.parse()
