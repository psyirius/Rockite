import type ConnectionModel from '$models/connection'
import { ConnectionComponent } from './Connection.styles'
import EditorConnected from './Editor/EditorConnected'
import EventsConnected from './Events/EventsConnected'
import HeaderConnected from './Header/HeaderConnected'

export interface ConnectionProps {
  connection: ConnectionModel
  highlighted: boolean
}

export default function Connection({ connection, highlighted }: ConnectionProps) {
  return (
    <div className="h-full w-full pr-2">
      <ConnectionComponent highlighted={highlighted}>
        <HeaderConnected connection={connection} />
        <EditorConnected connection={connection} />
        <div className="flex flex-col flex-grow">
          <EventsConnected connection={connection} />
        </div>
      </ConnectionComponent>
    </div>
  )
}
