import type Notification from '$types/UserInterface/Notification'
import { Fragment } from 'react'
import Spacer from '../Utilities/Spacer'
import NotificationListItem from './NotificationListItem'

export interface NotificationListProps {
  notifications: Notification[]
  onClose: (notification: Notification) => void
}

export default function NotificationList({ notifications, onClose }: NotificationListProps) {
  return (
    <div className="p-4">
      {notifications.map((notification, index) => (
        <Fragment key={notification.id}>
          <NotificationListItem notification={notification} onClose={() => onClose(notification)} />
          {index !== notifications.length - 1 && <Spacer />}
        </Fragment>
      ))}
    </div>
  )
}
