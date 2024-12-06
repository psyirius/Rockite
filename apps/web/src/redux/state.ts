import type Connection from '$models/connection'
import type Event from '$models/event'
import type { InternalProperties } from '$models/internal-property'
import type Project from '$models/project'
import type SavedPayload from '$models/saved-payload'
import type Tab from '$models/tab'
import type { UserInterfaceProperties } from '$models/user-interface-property'

export default interface State {
  migrations: { [key: string]: any }
  windows: { [key: string]: any }
  projects: { [key: string]: Project }
  connections: { [key: string]: Connection }
  savedPayloads: { [key: string]: SavedPayload }
  events: { [key: string]: Event }
  tabs: { [key: string]: Tab }
  internalProperties: InternalProperties
  userInterfaceProperties: UserInterfaceProperties
}
