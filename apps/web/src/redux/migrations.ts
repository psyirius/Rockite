import type { Migration } from '@/types/migration'
import moment from 'moment'
import type State from './state'

const _migrations: Record<string, Migration> = import.meta.glob('./migrations/*', {
  import: 'default',
  eager: true,
})

const migrations: Migration[] = (function () {
  const entries = Object.entries(_migrations)
    .map(([k, mod]) => {
      const pattern = /^.*\/((\d{4}-\d{2}-\d{2})-(\d{4,6})-(.*?)).(ts|js)$/

      const matches = pattern.exec(k)
      const totalMatches = 1 /* [0] full */ + 1 /* [1] module id */ + 4 /* [2] date + [3] seq + [4] name+ [5] ext */

      if (!matches || matches.length !== totalMatches) {
        throw new Error(`Invalid migration key: ${matches}`)
      }

      const [_full, _id, _date, _seq, _name, _ext] = matches

      // validate date : 2020-11-27
      const date = new Date(_date)

      if (date.toString() === 'Invalid Date') {
        throw new Error(`Invalid date: ${_date}`)
      }

      const seq = Number.parseInt(_seq)

      return [
        {
          id: _id,
          date,
          seq,
          name: _name,
          ext: _ext,
        },
        mod,
      ]
    })
    .sort(([ka], [kb]) => {
      function toMoment(m: any) {
        return moment(m.date).add(m.seq, 'seconds')
      }

      return toMoment(ka).diff(toMoment(kb))
    })

  return entries.map(([_, mod]) => mod) as Migration[]
})()

export const generateMigrationsWithKeys = () => {
  const migrationsWithKeys: any = {}

  migrations.forEach((migration) => {
    migrationsWithKeys[migration.id] = { id: migration.id }
  })

  return migrationsWithKeys
}

export const migrate = (storedState: any): State => {
  let liveState = JSON.parse(JSON.stringify(storedState))

  if (!liveState.migrations) {
    liveState.migrations = {}
  }

  liveState = migrations.reduce((state, migration) => {
    if (state.migrations[migration.id]) {
      return state
    }

    const migratedState = migration.execute(JSON.parse(JSON.stringify(state)))

    migratedState.migrations[migration.id] = { id: migration.id }

    return migratedState
  }, liveState)

  return liveState
}
