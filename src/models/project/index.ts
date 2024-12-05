import type Model from '$services/orm/model'
import type SocketProtocol from '$types/socket-protocol'

export default interface Project extends Model {
  name: string
  formatEventPayloads: boolean
  defaultSocketUrl: string
  defaultSocketProtocols: SocketProtocol[]
  defaultSocketAutoReconnect: boolean
  createdAt: string
}
