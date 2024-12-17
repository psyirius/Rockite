import {
  intro,
  outro,
  confirm,
  spinner,
  isCancel,
  cancel,
  text,
  note,
} from '@clack/prompts'
import color from 'picocolors'

import path from 'node:path'
import fs from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { setTimeout as sleep } from 'node:timers/promises';

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

const generateMigration = (name: string): [string, string] => {
  const id = generateNameSeries(name)
  const filename = [id, 'ts'].join('.')

  const source = MIGRATION_TEMPLATE.replace('<@ ID @>', JSON.stringify(id)).trim()

  const outputPath = path.join(MIGRATIONS_ROOT, filename)

  return [outputPath, source]
}

async function main() {
  console.log();
  intro(color.inverse(' create-migration '));

  const name = await text({
    message: 'Enter the name of the migration',
    placeholder: 'Name of the migration',
    validate(value) {
      if (value.length === 0) {
        return 'Migration name is required!';
      }
    },
  });

  if (isCancel(name)) {
    cancel('Operation cancelled');
    return process.exit(0);
  }

  const [defaultOutPath, migrationSource] = generateMigration(name)

  note(migrationSource, 'Generated migration');

  const defaultOutPathRelative = path.relative(process.cwd(), defaultOutPath)

  const outputPath = await text({
    message: 'Confirm the output path',
    initialValue: defaultOutPathRelative,
  });

  if (isCancel(outputPath)) {
    cancel('Operation cancelled');
    return process.exit(0);
  }

  const writeToDisk = await confirm({
    message: 'Do you want to write the migration to disk?',
  });

  if (isCancel(writeToDisk)) {
    cancel('Operation cancelled');
    return process.exit(0);
  }

  if (writeToDisk) {
    const s = spinner();
    const m = 'Writing migration to disk';

    s.start(m);

    await fs.writeFile(outputPath, migrationSource, { encoding: 'utf-8' });

    s.stop(m);

    outro("You're all set!");
  } else {
    outro('Skipping writing to disk');
  }

  await sleep(1000);
}

main().catch(console.error);