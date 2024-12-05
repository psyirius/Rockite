import React from 'react'
import { Provider } from 'react-redux'
import LayoutConnected from './LayoutConnected'
import GlobalStyles from '$components/General/Styled/GlobalStyles'
import InitializeAfterContext from './bootstrap/InitializeAfterContext'
import InitializeRedux from './bootstrap/InitializeRedux'
import { ContextMenuProvider } from './providers/ContextMenuProvider'
import { DropdownMenuProvider } from './providers/DropdownMenuProvider'
import { PopupProvider } from './providers/PopupProvider'
import NotificationsProvider from './providers/notifications/notifications.provider'
import TourProvider from './providers/tour/tour.provider'
import Store from './redux/store'

export default function App() {
  return (
    <React.StrictMode>
      <Provider store={Store}>
        <GlobalStyles />
        <InitializeRedux>
          <ContextMenuProvider>
            <DropdownMenuProvider>
              <PopupProvider>
                <TourProvider>
                  <NotificationsProvider>
                    <InitializeAfterContext>
                      <LayoutConnected />
                    </InitializeAfterContext>
                  </NotificationsProvider>
                </TourProvider>
              </PopupProvider>
            </DropdownMenuProvider>
          </ContextMenuProvider>
        </InitializeRedux>
      </Provider>
    </React.StrictMode>
  )
}
