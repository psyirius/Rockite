import type PersistenceStrategy from '$redux/persistence/persistence-strategy'
import type Table from '$redux/table'
import { mapValues } from 'lodash'
import type InternalProperty from '.'

const persist: PersistenceStrategy<InternalProperty<any>> = {
  shouldBroadcast: false,
  persist: (table: Table<InternalProperty<any>>) =>
    mapValues(table, (property) =>
      ['InitializedRunCount', 'InitializedWindowId'].includes(property.id)
        ? {
            ...property,
            value: false,
          }
        : property,
    ),
}

export default persist
