import { cn } from '$lib/utils'
import type Event from '$models/event'
import { EventPayloadType, EventType } from '$models/event'
import { Button } from '@headlessui/react'
import { format } from 'date-fns'
import {
  Binary as LuBinary,
  Clipboard as LuClipboard,
  ClipboardCheck as LuClipboardCheck,
  Text as LuText,
} from 'lucide-react'
import { useState } from 'react'
import { FaArrowDown, FaArrowUp, FaRegEdit } from 'react-icons/fa'
import { RiInformationLine } from 'react-icons/ri'
import { toast } from 'sonner'
import EventRowPayload from './EventRowPayload'

export interface EventRowProps {
  event: Event
  shouldFormatPayload: boolean
  onOpenInNewTab: () => void
  layout: 'narrow' | 'wide' // TODO: implement
}

export default function EventRow({ event, shouldFormatPayload, onOpenInNewTab }: EventRowProps) {
  const [copiedToClipboard, setCopiedToClipboard] = useState(false)

  async function copyToClipboard(text: string) {
    if (!copiedToClipboard) {
      try {
        await navigator.clipboard.writeText(text)
        setCopiedToClipboard(true)
        setTimeout(() => setCopiedToClipboard(false), 2000)
      } catch (err) {
        toast.error('Failed to copy text!')
      }
    }
  }

  return (
    <div className={cn('group', 'py-1', 'w-full max-w-full')}>
      <div className="flex flex-col">
        {/* Header */}
        <div className={cn('flex items-center')}>
          {/* Left */}
          <div className="flex items-center flex-1 overflow-x-hidden space-x-1">
            <div className="flex items-center justify-center flex-shrink-0">
              {/* Timestamp */}
              <div className="text-gray-400 dark:text-gray-600 font-mono">
                {format(new Date(event.timestamp), 'HH:mm ss.SS')}
              </div>

              {/* Icon */}
              {event.type === EventType.Sent && (
                <div className="text-green-500 dark:text-green-200 ml-2 p-1 text-xs">
                  <FaArrowUp title="Sent payload" />
                </div>
              )}

              {event.type === EventType.Received && (
                <div className="text-red-500 dark:text-red-200 ml-2 p-1 text-xs">
                  <FaArrowDown title="Received payload" />
                </div>
              )}

              {event.type === EventType.Meta && (
                <div className="text-gray-500 dark:text-gray-700 ml-2 p-1 text-xs">
                  <RiInformationLine title="Information" />
                </div>
              )}
            </div>

            {/* Payload */}
            <div
              className={cn(
                'flex-1 overflow-hidden text-ellipsis whitespace-nowrap pr-2',
                'min-w-0 font-mono max-w-full',
                event.type === EventType.Sent && 'text-green-900 dark:text-green-200',
                event.type === EventType.Received && 'text-red-900 dark:text-red-200',
                event.type === EventType.Meta && 'text-gray-900 dark:text-gray-200',
              )}
            >
              <span className="">
                <EventRowPayload event={event} shouldFormatPayload={shouldFormatPayload} />
              </span>
            </div>
          </div>

          {/* Badge & Controls */}
          <div
            className={cn(
              'flex items-center justify-end space-x-1',
              'min-w-[26px]', // 22 + 4
            )}
          >
            <div
              className={cn(
                'group-hover:visible text-gray-400',
                'flex items-center space-x-1',
                'invisible size-0',
                event.type !== EventType.Meta && 'group-hover:w-full',
              )}
            >
              {event.type !== EventType.Meta && (
                <Button
                  className={cn(
                    'rounded bg-sky-600 py-1 px-1 text-sm text-white',
                    'data-[hover]:text-gray-400 data-[active]:text-gray-500',
                    // "bg-red-300",
                    // copiedToClipboard && 'cursor-default',
                  )}
                  onClick={(e) => {
                    e.stopPropagation()
                    copyToClipboard(event.payload)
                  }}
                  title={copiedToClipboard ? 'Copied to Clipboard' : 'Copy to Clipboard'}
                >
                  {copiedToClipboard ? <LuClipboardCheck size={14} /> : <LuClipboard size={14} />}
                </Button>
              )}

              {event.type !== EventType.Meta && (
                <Button
                  className={cn(
                    'rounded bg-sky-600 py-1 px-1 text-sm text-white',
                    'data-[hover]:text-gray-500 data-[active]:text-gray-600',
                    // "bg-red-300",
                  )}
                  onClick={(e) => {
                    e.stopPropagation()
                    onOpenInNewTab()
                  }}
                >
                  <FaRegEdit title="Open in Editor" />
                </Button>
              )}
            </div>

            <div
              className={cn(
                // 'invisible group-hover:visible',
                event.type === EventType.Sent && 'text-green-500 dark:text-green-200',
                event.type === EventType.Received && 'text-red-500 dark:text-red-200',
              )}
            >
              {event.payloadType === EventPayloadType.Text && (
                <div className="bg-gray-100 dark:bg-gray-800 rounded p-1 text-xs" title="Text">
                  <LuText size={14} />
                </div>
              )}

              {event.payloadType === EventPayloadType.Binary && (
                <div className="bg-gray-100 dark:bg-gray-800 rounded p-1 text-xs" title="Binary">
                  <LuBinary size={14} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
