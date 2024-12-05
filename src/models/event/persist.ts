import type PersistenceStrategy from '$redux/persistence/persistence-strategy'
import type Event from '.'

const persist: PersistenceStrategy<Event> = {
  shouldBroadcast: true,
  persist: (table) => table,
}

export default persist
