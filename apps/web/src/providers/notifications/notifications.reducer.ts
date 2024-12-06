import reducer from '$helpers/reducer/reducer'
import type Notification from '$types/UserInterface/Notification'
import { v4 as uuid } from 'uuid'
import NotificationsActions from './notifications.actions'

export default reducer<Notification[]>({
  [NotificationsActions.Push]: (state, action) => [
    ...state,
    {
      id: uuid(),
      ...action.payload,
    },
  ],
  [NotificationsActions.Close]: (state, action) => state.filter((notification) => notification !== action.payload),
})
