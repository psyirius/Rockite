import { type Dispatch, type ReactNode, createContext, useReducer } from 'react'
import 'twin.macro'
import NotificationList from '$components/General/NotificationList/NotificationList'
import type Notification from '$types/UserInterface/Notification'
import { Portal } from 'react-portal'
import NotificationsActions from './notifications.actions'
import notificationsReducer from './notifications.reducer'

export const NotificationsDispatchContext = createContext<Dispatch<any>>(() => null)
export const NotificationsStateContext = createContext<Notification[]>([])

const initialState: Notification[] = []

export interface NotificationsProviderProps {
  children: ReactNode
}

export default function NotificationsProvider({ children }: NotificationsProviderProps) {
  const [state, dispatch] = useReducer(notificationsReducer, initialState)

  return (
    <NotificationsDispatchContext.Provider value={dispatch}>
      <NotificationsStateContext.Provider value={state}>
        {children}
        {state.length > 0 && (
          <Portal>
            <div tw="absolute right-0 bottom-0">
              <NotificationList
                notifications={state}
                onClose={(notification) =>
                  (dispatch as any)({
                    type: NotificationsActions.Close,
                    payload: notification,
                  })
                }
              />
            </div>
          </Portal>
        )}
      </NotificationsStateContext.Provider>
    </NotificationsDispatchContext.Provider>
  )
}
