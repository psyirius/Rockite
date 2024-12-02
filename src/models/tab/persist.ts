import PersistenceStrategy from '$redux/persistence/persistence-strategy.ts';
import Tab from '.';

const persist: PersistenceStrategy<Tab> = {
  shouldBroadcast: true,
  persist: (table) => table,
};

export default persist;
