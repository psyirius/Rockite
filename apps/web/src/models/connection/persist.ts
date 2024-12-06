import type PersistenceStrategy from '$redux/persistence/persistence-strategy'
import type State from '$redux/state'
import type Table from '$redux/table'
import { mapValues } from 'lodash'
import type Connection from '.'
import { ConnectionSocketStatus } from '.'

const persist: PersistenceStrategy<Connection> = {
  shouldBroadcast: true,
  broadcast: (model) => ({
    ...model,
    socketStatus: ConnectionSocketStatus.Disconnected,
    socketSecondsUntilReconnect: null,
  }),
  persist: (table: Table<Connection>, state: State) =>
    mapValues(table, (connection: Connection) =>
      connection.windowId === state.userInterfaceProperties.SelectedWindowId.value
        ? {
            ...connection,
            socketStatus: ConnectionSocketStatus.Disconnected,
            socketSecondsUntilReconnect: null,
          }
        : connection,
    ),
}

export default persist
