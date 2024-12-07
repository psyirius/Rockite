import { cn } from '$lib/utils'
import type Event from '$models/event'
import { EventPayloadType, EventType } from '$models/event'
import { format } from 'date-fns'
import { Binary as LuBinary, Text as LuText } from 'lucide-react'
import { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { FaArrowDown, FaArrowUp, FaRegCopy, FaRegEdit } from 'react-icons/fa'
import { MdDone } from 'react-icons/md'
import { RiInformationLine } from 'react-icons/ri'
import EventRowPayload from './EventRowPayload'

export interface EventRowProps {
  event: Event
  shouldFormatPayload: boolean
  onOpenInNewTab: () => void
  layout: 'narrow' | 'wide'
}

export default function EventRow({ event, shouldFormatPayload, onOpenInNewTab, layout }: EventRowProps) {
  const [copiedToClipboard, setCopiedToClipboard] = useState(false)

  return (
    <div
      key={event.id}
      className={cn(
        'group',
        'max-w-full flex flex-row justify-between py-1 px-4 hover:bg-gray-100 hover:dark:bg-gray-800',
        layout === 'narrow' && 'flex-wrap',
      )}
    >
      <div className="order-1 flex flex-shrink-0">
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
          'flex-grow min-w-0 font-mono',
          layout === 'narrow' && 'order-4 w-full',
          layout === 'wide' && 'order-3 ml-4',
          event.type === EventType.Sent && 'text-green-900 dark:text-green-200',
          event.type === EventType.Received && 'text-red-900 dark:text-red-200',
          event.type === EventType.Meta && 'text-gray-900 dark:text-gray-200',
        )}
      >
        <pre className="whitespace-pre-wrap break-words">
          <EventRowPayload event={event} shouldFormatPayload={shouldFormatPayload} />
        </pre>
      </div>

      <div
        className={cn(
          // 'invisible group-hover:visible',
          event.type === EventType.Sent && 'text-green-500 dark:text-green-200',
          event.type === EventType.Received && 'text-red-500 dark:text-red-200',
          layout === 'narrow' && 'order-3',
          layout === 'wide' && 'order-4',
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

      <div
        className={cn(
          'invisible group-hover:visible text-gray-400',
          layout === 'narrow' && 'order-3',
          layout === 'wide' && 'order-4',
        )}
      >
        <CopyToClipboard
          text={event.payload}
          onCopy={() => {
            if (!copiedToClipboard) {
              setCopiedToClipboard(true)
              setTimeout(() => setCopiedToClipboard(false), 2000)
            }
          }}
        >
          <button type="button" className={cn('ml-2 hover:text-gray-600', copiedToClipboard && 'cursor-default')}>
            {!copiedToClipboard && <FaRegCopy title="Copy to Clipboard" />}
            {copiedToClipboard && <MdDone title="Copied to Clipboard" />}
          </button>
        </CopyToClipboard>

        {event.type !== EventType.Meta && (
          <button type="button" className="ml-2 hover:text-gray-600" onClick={() => onOpenInNewTab()}>
            <FaRegEdit title="Open in Editor" />
          </button>
        )}
      </div>
    </div>
  )
}
