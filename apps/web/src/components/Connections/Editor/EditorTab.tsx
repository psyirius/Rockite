import { cn } from '$lib/utils'
import type SavedPayload from '$models/saved-payload'
import type TabModel from '$models/tab'
import { ContextMenuContext } from '$providers/ContextMenuProvider'
import type React from 'react'
import { useContext } from 'react'
import { MdClose } from 'react-icons/md'
import TextLimit from '../../General/Utilities/TextLimit'

export interface EditorTabProps {
  tab: TabModel
  savedPayload: SavedPayload | undefined
  showClose: boolean
  onClose: any
  onSwitch: any
}

export default function EditorTab({ tab, savedPayload, showClose, onClose, onSwitch }: EditorTabProps) {
  const contextMenu = useContext(ContextMenuContext)

  return (
    <button
      type="button"
      onClick={() => onSwitch()}
      onContextMenu={(event) => {
        if (!showClose) {
          return
        }

        contextMenu.openForMouseEvent(event, [
          ...(!tab.selected
            ? [
                {
                  label: 'Switch to',
                  onClick: () => onSwitch(),
                },
              ]
            : []),
          ...(showClose
            ? [
                {
                  label: 'Close',
                  onClick: () => onClose(),
                },
              ]
            : []),
        ])
      }}
      className={cn(
        'flex flex-grow justify-between items-center border-r dark:border-gray-700 py-1 px-4 whitespace-nowrap uppercase font-semibold text-sm text-gray-700 dark:text-gray-200',
        showClose && 'pr-3',
        tab.selected && 'bg-white dark:bg-gray-850 cursor-default',
        !tab.selected && 'bg-gray-200 dark:bg-gray-900 hover:bg-gray-100 hover:dark:bg-gray-800',
      )}
    >
      {savedPayload ? <TextLimit characters={20}>{savedPayload.name}</TextLimit> : `Untitled ${tab.number}`}
      {showClose && (
        <div
          role="presentation"
          onClick={(event: React.MouseEvent) => {
            event.stopPropagation()
            onClose()
          }}
          className="text-xs text-gray-700 dark:text-gray-400 p-1 ml-2 hover:bg-gray-500 hover:dark:bg-gray-700 hover:text-white cursor-pointer rounded"
        >
          <MdClose />
        </div>
      )}
    </button>
  )
}
