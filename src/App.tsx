import React from 'react';
import { Toaster } from "sonner";
import { Provider } from 'react-redux';
import Store from './redux/store';
import LayoutConnected from './LayoutConnected';
import { ContextMenuProvider } from './providers/ContextMenuProvider';
import { DropdownMenuProvider } from './providers/DropdownMenuProvider';
import { PopupProvider } from './providers/PopupProvider';
import GlobalStyles from '$components/General/Styled/GlobalStyles';
import InitializeRedux from './bootstrap/InitializeRedux';
import NotificationsProvider from './providers/notifications/notifications.provider';
import InitializeAfterContext from './bootstrap/InitializeAfterContext';
import TourProvider from './providers/tour/tour.provider';

export default function App() {
  return (
    <React.StrictMode>
      <Provider store={Store}>
        <Toaster />
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
  );
}
