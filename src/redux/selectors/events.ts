import type Connection from '$models/connection'
import type Event from '$models/event'
import { dataSource } from '$models/event/query'
import type State from '../state'

export const eventsForConnection = (state: State, connection: Connection): Event[] =>
  dataSource().withState(state).where('connectionId', connection.id).get().reverse()
