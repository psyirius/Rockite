import Project from '.';
import PersistenceStrategy from '$redux/persistence/persistence-strategy.ts';

const persist: PersistenceStrategy<Project> = {
  shouldBroadcast: true,
  persist: (table) => table,
};

export default persist;
