import type PersistenceStrategy from '$redux/persistence/persistence-strategy'
import type SavedPayload from '.'

const persist: PersistenceStrategy<SavedPayload> = {
  shouldBroadcast: true,
  persist: (table) => table,
}

export default persist
