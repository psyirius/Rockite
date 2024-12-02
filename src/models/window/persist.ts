import Window from '.';
import PersistenceStrategy from '$redux/persistence/persistence-strategy.ts';

const persist: PersistenceStrategy<Window> = {
  shouldBroadcast: true,
  persist: (table) => table,
};

export default persist;
