import { cn } from '$lib/utils'
import { ContextMenuContext } from '$providers/ContextMenuProvider'
import { DropdownMenuContext } from '$providers/DropdownMenuProvider'
import type ContextMenuAction from '$providers/context-menu-action'
import type React from 'react'
import { type ReactElement, useContext, useState } from 'react'
import { FaEllipsisH } from 'react-icons/fa'

export interface ListItemProps {
  title: ReactElement | string
  subtitle?: ReactElement | string
  isSelected?: boolean
  onClick?: (event: React.MouseEvent) => void
  primaryClickActions?: ContextMenuAction[]
  secondaryClickActions?: ContextMenuAction[]
}

export default function ListItem({
  title,
  subtitle,
  isSelected: isSelectedExternal,
  onClick,
  primaryClickActions = [],
  secondaryClickActions = [],
}: ListItemProps) {
  const contextMenu = useContext(ContextMenuContext)
  const dropdownMenu = useContext(DropdownMenuContext)

  const [isSelected, setIsSelected] = useState<boolean>(false)
  const [isDropdownSelected, setIsDropdownSelected] = useState<boolean>(false)

  return (
    <li
      className={cn(
        'group',
        'flex border-b last:border-b-0 border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-800',
        (isSelected || isSelectedExternal) && 'bg-gray-100 dark:bg-gray-800',
      )}
    >
      <button
        type="button"
        onClick={async (event) => {
          if (primaryClickActions?.length) {
            setIsSelected(true)
            contextMenu.openForMouseEvent(event, primaryClickActions)
            setIsSelected(false)
          }

          onClick?.(event)
        }}
        onContextMenu={async (event) => {
          if (secondaryClickActions?.length) {
            setIsSelected(true)
            contextMenu.openForMouseEvent(event, secondaryClickActions)
            setIsSelected(false)
          }
        }}
        className="w-full flex flex-row items-center py-2 px-4"
      >
        <div className="flex flex-col flex-grow text-left">
          <div className="text-gray-800 dark:text-gray-200" data-testid="title">
            {title}
          </div>
          {subtitle && (
            <div className="pt-2 text-gray-500 dark:text-gray-400 text-xs" data-testid="subtitle">
              {subtitle}
            </div>
          )}
        </div>
        {!!secondaryClickActions?.length && (
          <div
            role="presentation"
            className={cn(
              'ml-2 text-xs text-gray-700 dark:text-gray-300 p-1 hover:bg-gray-300 hover:dark:bg-gray-700 rounded',
              !isDropdownSelected && 'invisible group-hover:visible',
              isDropdownSelected && 'bg-gray-300 dark:bg-gray-900 visible',
            )}
            onClick={async (event) => {
              event.stopPropagation()
              setIsSelected(true)
              setIsDropdownSelected(true)
              dropdownMenu.openForElement(event.currentTarget as HTMLElement, secondaryClickActions!)
              setIsSelected(false)
              setIsDropdownSelected(false)
            }}
            onContextMenu={(event) => {
              event.stopPropagation()
              event.preventDefault()
            }}
          >
            <FaEllipsisH />
          </div>
        )}
      </button>
    </li>
  )
}
