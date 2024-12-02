import { mapValues } from 'lodash';
import Connection, { ConnectionSocketStatus } from '.';
import PersistenceStrategy from '$redux/persistence/persistence-strategy.ts';
import State from '$redux/state';
import Table from '$redux/table';

const persist: PersistenceStrategy<Connection> = {
  shouldBroadcast: true,
  broadcast: (model) => ({
    ...model,
    socketStatus: ConnectionSocketStatus.Disconnected,
    socketSecondsUntilReconnect: null,
  }),
  persist: (table: Table<Connection>, state: State) => mapValues(
    table,
    (connection: Connection) => (
      connection.windowId === state.userInterfaceProperties.SelectedWindowId.value
        ? {
          ...connection,
          socketStatus: ConnectionSocketStatus.Disconnected,
          socketSecondsUntilReconnect: null,
        }
        : connection
    ),
  ),
};

export default persist;
