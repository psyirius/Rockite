import type Model from '$services/orm/model'
import type SocketProtocol from '$types/socket-protocol'

export enum ConnectionSocketStatus {
  Disconnected = 0,
  Pending = 1,
  Connected = 2,
  PendingReconnection = 3,
}

export default interface Connection extends Model {
  windowId: string
  projectId: string
  name: string
  socketUrl: string
  socketProtocols: SocketProtocol[]
  socketAutoReconnect: boolean
  socketStatus: ConnectionSocketStatus
  socketSecondsUntilReconnect: number | null
  order: number
  maximized: boolean
}
