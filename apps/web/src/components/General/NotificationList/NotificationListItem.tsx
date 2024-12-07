import type Notification from '$types/UserInterface/Notification'
import { MdClose } from 'react-icons/md'
import ButtonPrimary from '../Styled/ButtonPrimary'
import ButtonSecondary from '../Styled/ButtonSecondary'

export interface NotificationListItemProps {
  notification: Notification
  onClose: () => void
}

export default function NotificationListItem({ notification, onClose }: NotificationListItemProps) {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 dark:border dark:border-gray-700 rounded-lg border shadow p-4 w-96">
      <div className="flex justify-between">
        <strong className="font-semibold text-gray-900 dark:text-gray-100">{notification.title}</strong>
        <ButtonSecondary className="p-1">
          <MdClose onClick={() => onClose()} />
        </ButtonSecondary>
      </div>
      <p className="my-2 select-text text-sm text-gray-700 dark:text-gray-300">{notification.body}</p>
      <div className="flex justify-end">
        {notification.actions.map((action) =>
          action.theme === 'primary' ? (
            <ButtonPrimary
              key={action.label}
              className="ml-2 py-1 px-2 rounded"
              onClick={() => {
                action.onClick?.()
                onClose()
              }}
            >
              {action.label}
            </ButtonPrimary>
          ) : (
            <ButtonSecondary
              key={action.label}
              className="ml-2 py-1 px-2 rounded"
              onClick={() => {
                action.onClick?.()
                onClose()
              }}
            >
              {action.label}
            </ButtonSecondary>
          ),
        )}
      </div>
    </div>
  )
}
