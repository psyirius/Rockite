import { useContext } from 'react'
import 'twin.macro'
import { PopupContext } from '$providers/PopupProvider'
import PopupBody from '../Popup/PopupBody'
import PopupButtons from '../Popup/PopupButtons'

export interface PopupConfirmationProps {
  message: string
}

export default function PopupConfirmation({ message }: PopupConfirmationProps) {
  const popup = useContext(PopupContext)

  return (
    <>
      <PopupBody>
        <p tw="text-gray-800 dark:text-gray-200">{message}</p>
      </PopupBody>
      <PopupButtons
        actions={[
          {
            label: 'No',
            theme: 'secondary',
            onClick: () => popup.pop(false),
          },
          {
            label: 'Yes',
            theme: 'primary',
            onClick: () => popup.pop(true),
          },
        ]}
      />
    </>
  )
}
