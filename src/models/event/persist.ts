import Event from '.';
import PersistenceStrategy from '$redux/persistence/persistence-strategy.ts';

const persist: PersistenceStrategy<Event> = {
  shouldBroadcast: true,
  persist: (table) => table,
};

export default persist;
