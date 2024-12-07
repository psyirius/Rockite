import { cn } from '$lib/utils'
import type Connection from '$models/connection'
import { ConnectionSocketStatus } from '$models/connection'
import { PopupContext } from '$providers/PopupProvider'
import type { socketConnect, socketDisconnect } from '$redux/actions/connection-sockets'
import type {
  connectionDisconnectSocketAndRemove,
  connectionMinimize,
  connectionUpdateAutoReconnect,
  connectionUpdateName,
  connectionUpdateProtocols,
  connectionUpdateSocketUrl,
} from '$redux/actions/connections'
import { useContext, useEffect, useState } from 'react'
import { GoDash } from 'react-icons/go'
import { MdClose } from 'react-icons/md'
import { RiSettings3Line } from 'react-icons/ri'
import EditConnection from '../../EditConnection/EditConnection'
import ButtonPrimary from '../../General/Styled/ButtonPrimary'
import ButtonSecondary from '../../General/Styled/ButtonSecondary'
import HeaderName from './HeaderName'

export interface HeaderProps {
  onWebSocketUrlChange: typeof connectionUpdateSocketUrl
  onWebSocketNameChange: typeof connectionUpdateName
  onWebSocketProtocolsChange: typeof connectionUpdateProtocols
  onWebSocketAutoReconnectChange: typeof connectionUpdateAutoReconnect
  onWebSocketConnect: typeof socketConnect
  onWebSocketDisconnect: typeof socketDisconnect
  onClose: typeof connectionDisconnectSocketAndRemove
  onMinimize: typeof connectionMinimize
  connection: Connection
}

export default function Header({
  onWebSocketUrlChange,
  onWebSocketNameChange,
  onWebSocketProtocolsChange,
  onWebSocketAutoReconnectChange,
  onWebSocketConnect,
  onWebSocketDisconnect,
  onClose,
  onMinimize,
  connection,
}: HeaderProps) {
  const popup = useContext(PopupContext)
  const [connectionUrl, setConnectionUrl] = useState(connection.socketUrl)
  const [socketUrlInputFocused, setSocketUrlInputFocused] = useState<boolean>(false)
  const [connectionOptionsPopupOpen, setConnectionOptionsPopupOpen] = useState<boolean>(false)

  useEffect(() => {
    onWebSocketUrlChange(connection, connectionUrl)
  }, [connectionUrl])

  const connectOrDisconnectClick = () => {
    if (connection.socketStatus === ConnectionSocketStatus.Disconnected) {
      onWebSocketConnect(connection)
    }

    if (connection.socketStatus === ConnectionSocketStatus.Connected) {
      onWebSocketDisconnect(connection)
    }
  }

  return (
    <div className="w-full bg-gray-200 dark:bg-gray-900">
      <div className="flex flex-row p-2 items-center">
        <div className="flex-none pl-2 pr-4">
          <HeaderName name={connection.name} onNameChange={(name) => onWebSocketNameChange(connection, name)} />
        </div>
        <div className="flex-grow">
          <div
            data-tour="connection-url"
            className={cn(
              'flex flex-row flex-grow overflow-hidden rounded-lg border-2 dark:border-gray-700 h-10',
              socketUrlInputFocused && 'border-gray-400 dark:border-gray-600',
              connection.socketStatus !== ConnectionSocketStatus.Disconnected && 'bg-gray-100 dark:bg-gray-900',
              connection.socketStatus === ConnectionSocketStatus.Disconnected && 'bg-white dark:bg-gray-850',
            )}
          >
            <div
              className={cn(
                'flex flex-row flex-grow items-center',
                connection.socketStatus !== ConnectionSocketStatus.Disconnected && 'pointer-events-none',
              )}
            >
              <label className="flex-grow w-full">
                <span className="sr-only">WebSocket URL</span>
                <input
                  type="text"
                  placeholder="WebSocket URL"
                  className="w-full py-1 pl-2 pr-1 bg-transparent text-gray-900 dark:text-gray-100"
                  onChange={(event) => setConnectionUrl(event.target.value)}
                  onFocus={() => setSocketUrlInputFocused(true)}
                  onBlur={() => setSocketUrlInputFocused(false)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      ;(event.target as HTMLInputElement).blur()
                      connectOrDisconnectClick()
                    }
                  }}
                  value={connectionUrl}
                />
              </label>
              <ButtonSecondary
                onClick={async () => {
                  setConnectionOptionsPopupOpen(true)
                  await popup.push(`${connection.name} Connection Options`, EditConnection, {
                    connection,
                    onWebSocketProtocolsChange,
                    onWebSocketAutoReconnectChange,
                  })
                  setConnectionOptionsPopupOpen(false)
                }}
                title="Connection Options"
                className={cn(
                  'm-1 h-6 flex-none p-1 rounded',
                  connectionOptionsPopupOpen && 'bg-gray-400 dark:bg-gray-700',
                  connection.socketStatus !== ConnectionSocketStatus.Disconnected && 'text-gray-300 dark:text-gray-600',
                  connection.socketStatus === ConnectionSocketStatus.Disconnected && 'text-gray-600 dark:text-gray-300',
                )}
                type="button"
              >
                <RiSettings3Line className="text-sm" />
              </ButtonSecondary>
            </div>
            <ButtonPrimary
              type="button"
              onClick={() => connectOrDisconnectClick()}
              disabled={
                [ConnectionSocketStatus.PendingReconnection, ConnectionSocketStatus.Pending].includes(
                  connection.socketStatus,
                ) || !connection.socketUrl.length
              }
              className={cn('px-4 mr-2 my-1 rounded')}
            >
              {connection.socketStatus === ConnectionSocketStatus.Disconnected && 'Connect'}
              {connection.socketStatus === ConnectionSocketStatus.Pending && 'Connecting'}
              {connection.socketStatus === ConnectionSocketStatus.Connected && 'Disconnect'}
              {connection.socketStatus === ConnectionSocketStatus.PendingReconnection &&
                `Reconnecting in ${connection.socketSecondsUntilReconnect}`}
            </ButtonPrimary>
          </div>
        </div>
        <div className="flex-none h-8 ml-2">
          <ButtonSecondary
            title="Minimize"
            className="px-2 h-8 rounded"
            onClick={() => onMinimize(connection)}
            type="button"
          >
            <GoDash />
          </ButtonSecondary>
          <ButtonSecondary title="Close" className="px-2 h-8 rounded" onClick={() => onClose(connection)} type="button">
            <MdClose />
          </ButtonSecondary>
        </div>
      </div>
    </div>
  )
}
