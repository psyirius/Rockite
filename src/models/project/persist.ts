import type PersistenceStrategy from '$redux/persistence/persistence-strategy'
import type Project from '.'

const persist: PersistenceStrategy<Project> = {
  shouldBroadcast: true,
  persist: (table) => table,
}

export default persist
