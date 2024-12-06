import { OrmActionType } from '$services/orm/orm-action'
import type { Dispatch, Middleware } from 'redux'
import { type Action, broadcastedOrmAction, replace } from '../actions'
import { windowsMarkClosed } from '../actions/windows'
import type State from '../state'
import { PersistenceBroadcastChannelActionType } from './persistence-boardcast-channel-action'
import channel from './persistence-broadcast-channel'
import { loadState } from './persistence-manager'

const loadStateAndDispatch = async (dispatch: Dispatch<any>) => dispatch(replace(await loadState()))

const persistenceMiddleware: Middleware = (store) => {
  loadStateAndDispatch(store.dispatch)

  channel.receive(PersistenceBroadcastChannelActionType.OrmReplay, (action) =>
    store.dispatch(broadcastedOrmAction(action.payload)),
  )

  channel.receive(PersistenceBroadcastChannelActionType.WindowPing, () =>
    channel.send({
      type: PersistenceBroadcastChannelActionType.WindowPong,
      payload: (store.getState() as State).userInterfaceProperties.SelectedWindowId.value,
    }),
  )

  channel.receive(PersistenceBroadcastChannelActionType.WindowClosed, (action) =>
    store.dispatch(windowsMarkClosed(action.payload) as any),
  )

  window.addEventListener('beforeunload', () => {
    const state = store.getState() as State
    const windowId = state.userInterfaceProperties.SelectedWindowId.value

    if (windowId) {
      channel.send({
        type: PersistenceBroadcastChannelActionType.WindowClosed,
        payload: state.windows[windowId],
      })
    }
  })

  return (next) => (action: Action) => {
    if (action.type === OrmActionType.Mutations) {
      channel.send({
        type: PersistenceBroadcastChannelActionType.OrmReplay,
        payload: action,
      })
    }

    return next(action)
  }
}

export default persistenceMiddleware
