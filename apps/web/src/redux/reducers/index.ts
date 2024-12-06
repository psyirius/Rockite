import type Connection from '$models/connection'
import type Event from '$models/event'
import type InternalProperty from '$models/internal-property'
import type Project from '$models/project'
import type SavedPayload from '$models/saved-payload'
import type Tab from '$models/tab'
import type UserInterfaceProperty from '$models/user-interface-property'
import type Window from '$models/window'
import createReducer from '$services/orm/reducer'
import { combineReducers } from 'redux'
import { ActionType } from '../actions'
import type State from '../state'

const reducers = combineReducers({
  migrations: (state: State) => state || {},
  windows: createReducer<Window>('windows'),
  projects: createReducer<Project>('projects'),
  connections: createReducer<Connection>('connections'),
  savedPayloads: createReducer<SavedPayload>('savedPayloads'),
  events: createReducer<Event>('events'),
  tabs: createReducer<Tab>('tabs'),
  userInterfaceProperties: createReducer<UserInterfaceProperty<any>>('userInterfaceProperties'),
  internalProperties: createReducer<InternalProperty<any>>('internalProperties'),
})

const rootReducer = (combinedReducers: typeof reducers) => (state: any, action: any) => {
  switch (action.type) {
    case ActionType.Replace:
      return action.payload
    default:
      return combinedReducers(state, action)
  }
}

export default rootReducer(reducers)
