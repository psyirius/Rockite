import { mapValues } from 'lodash';
import InternalProperty from '.';
import PersistenceStrategy from '$redux/persistence/persistence-strategy.ts';
import Table from '$redux/table';

const persist: PersistenceStrategy<InternalProperty<any>> = {
  shouldBroadcast: false,
  persist: (table: Table<InternalProperty<any>>) => mapValues(
    table,
    (property) => (
      ['InitializedRunCount', 'InitializedWindowId'].includes(property.id)
        ? {
          ...property,
          value: false,
        }
        : property
    ),
  ),
};

export default persist;
