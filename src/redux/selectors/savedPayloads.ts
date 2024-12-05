import type SavedPayload from '$models/saved-payload'
import { dataSource } from '$models/saved-payload/query'
import type State from '../state'

export const savedPayloadsForProject = (state: State, projectId: string): SavedPayload[] =>
  dataSource().withState(state).where('projectId', projectId).get()

export const savedPayloadsForCurrentProject = (state: State): SavedPayload[] =>
  dataSource().withState(state).where('projectId', state.userInterfaceProperties.SelectedProjectId.value).get()
