import type Connection from '$models/connection'
import type Event from '$models/event'
import type { eventsRemoveForConnection } from '$redux/actions/events'
import type { tabCreate } from '$redux/actions/tabs'
import { AiOutlineDelete } from 'react-icons/ai'
import useResizeObserver from 'use-resize-observer/polyfilled'
import EmptyMessage from '../../General/Utilities/EmptyMessage'
import Heading from '../../General/Utilities/Heading'
import EventRow from './EventRow'

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
          <div className="absolute inset-0 overflow-auto py-2 select-text">
            {events.map((event) => (
              <EventRow
                key={event.id}
                event={event}
                shouldFormatPayload={formatEventPayloads}
                onOpenInNewTab={() => onCreateInTab(connection, event.payload)}
                layout={containerWidth < 400 ? 'narrow' : 'wide'}
              />
            ))}
          </div>
        )}
        {!events.length && (
          <EmptyMessage heading="No Output">Sent and received messages will show up here.</EmptyMessage>
        )}
      </div>
    </>
  )
}
