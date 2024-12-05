import type PersistenceStrategy from '$redux/persistence/persistence-strategy'
import type Window from '.'

const persist: PersistenceStrategy<Window> = {
  shouldBroadcast: true,
  persist: (table) => table,
}

export default persist
