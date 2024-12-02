import PersistenceStrategy from '$redux/persistence/persistence-strategy.ts';
import SavedPayload from '.';

const persist: PersistenceStrategy<SavedPayload> = {
  shouldBroadcast: true,
  persist: (table) => table,
};

export default persist;
