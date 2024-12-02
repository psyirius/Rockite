import UserInterfaceProperty from '.';
import PersistenceStrategy from '$redux/persistence/persistence-strategy.ts';

const persist: PersistenceStrategy<UserInterfaceProperty<any>> = {
  shouldBroadcast: false,
  persist: (table, state) => (
    {
      ...table,
      [state.userInterfaceProperties.SelectedWindowId.id]: {
        ...table[state.userInterfaceProperties.SelectedWindowId.id],
        value: null,
      },
    }
  ),
};

export default persist;
