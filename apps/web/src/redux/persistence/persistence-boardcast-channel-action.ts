export enum PersistenceBroadcastChannelActionType {
  OrmReplay = 0,
  WindowClosed = 1,
  WindowPing = 2,
  WindowPong = 3,
}

type PersistenceBroadcastChannelAction = {
  type: PersistenceBroadcastChannelActionType
  payload?: any
}

export default PersistenceBroadcastChannelAction
