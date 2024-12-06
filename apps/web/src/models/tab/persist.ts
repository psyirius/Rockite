import type PersistenceStrategy from '$redux/persistence/persistence-strategy'
import type Tab from '.'

const persist: PersistenceStrategy<Tab> = {
  shouldBroadcast: true,
  persist: (table) => table,
}

export default persist
