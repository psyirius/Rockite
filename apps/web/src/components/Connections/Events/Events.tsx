import type Connection from '$models/connection'
import type Event from '$models/event'
import type { eventsRemoveForConnection } from '$redux/actions/events'
import type { tabCreate } from '$redux/actions/tabs'
import { AiOutlineDelete } from 'react-icons/ai'
import useResizeObserver from 'use-resize-observer/polyfilled'
import EmptyMessage from '../../General/Utilities/EmptyMessage'
import Heading from '../../General/Utilities/Heading'
import EventRow from './EventRow'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {cn} from "$lib/utils.ts";
import EventRowPayload from './EventRowPayload'

export interface EventsProps {
  connection: Connection
  formatEventPayloads: boolean
  events: Event[]
  onClear: typeof eventsRemoveForConnection
  onCreateInTab: typeof tabCreate
}

export default function Events({ connection, formatEventPayloads, events, onClear, onCreateInTab }: EventsProps) {
  const { ref: containerRef, width: containerWidth = 1 } = useResizeObserver<HTMLDivElement>()

  return (
    <>
      <Heading
        className="flex-grow-0"
        buttons={[
          {
            icon: <AiOutlineDelete />,
            alt: 'Clear Output',
            onClick: () => onClear(connection),
          },
        ]}
      >
        Output
      </Heading>
      <div className="flex-grow relative flex" ref={containerRef}>
        {!!events.length && (
          <Accordion type="single" collapsible className="absolute inset-0 overflow-auto py-2 select-text">
            {events.map((event) => (
              <AccordionItem value={event.id} key={event.id} className={cn(
                "border-b-0 px-4 py-0.5 hover:bg-gray-100 hover:dark:bg-gray-800",
              )}>
                <AccordionTrigger className={cn(
                  "p-0 hover:no-underline",
                  "focus:!outline-0",
                  'max-w-full',
                )}>
                  <div className="w-full pr-1 overflow-hidden">
                    <EventRow
                      event={event}
                      shouldFormatPayload={formatEventPayloads}
                      onOpenInNewTab={() => onCreateInTab(connection, event.payload)}
                      layout={containerWidth < 400 ? 'narrow' : 'wide'}
                    />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-2">
                  <div className={cn(
                    "bg-gray-100 dark:bg-gray-900 p-2 rounded overflow-auto border dark:border-gray-700",
                    "text-gray-50"
                  )}>
                    <pre className="font-mono text-sm dark:text-gray-200 text-gray-800 whitespace-pre-wrap break-words">
                      <EventRowPayload event={event} shouldFormatPayload={formatEventPayloads}/>
                    </pre>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
        {!events.length && (
          <EmptyMessage heading="No Output">Sent and received messages will show up here.</EmptyMessage>
        )}
      </div>
    </>
  )
}
