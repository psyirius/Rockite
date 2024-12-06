import type Tab from '$models/tab'
import { dataSource } from '$models/tab/query'
import type State from '../state'

export const tabsForConnection = (state: State, connectionId: string): Tab[] =>
  dataSource().withState(state).where('connectionId', connectionId).get()
