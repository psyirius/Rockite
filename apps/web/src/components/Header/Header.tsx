import ThemeSwitch from '$components/General/Utilities/ThemeSwitch'
import type Connection from '$models/connection'
import type Project from '$models/project'
import type Window from '$models/window'
import { PopupContext } from '$providers/PopupProvider'
import type { connectionCreate, connectionToggleMaximize, connectionUpdateName } from '$redux/actions/connections'
import type { userInterfaceSidebarToggle } from '$redux/actions/user-interface-properties'
import type { windowsReassignConnectionsAndDelete, windowsRemoveClosedForProject } from '$redux/actions/windows'
import { useContext } from 'react'
import { FaTh } from 'react-icons/fa'
import tw from 'twin.macro'
import SidebarIcon from '../General/Icons/SidebarIcon'
import ButtonSecondary from '../General/Styled/ButtonSecondary'
import ProjectsConnected from '../Projects/ProjectsConnected'
import HeaderConnectionList from './HeaderConnectionList'
import HeaderRightHandDropdown from './HeaderRightHandDropdown'

export type HeaderProps = {
  onConnectionCreate: typeof connectionCreate
  onConnectionRemove: (connection: Connection) => void
  onConnectionUpdateName: typeof connectionUpdateName
  onConnectionToggleMaximize: typeof connectionToggleMaximize
  onSidebarToggle: typeof userInterfaceSidebarToggle
  onClearClosedWindows: typeof windowsRemoveClosedForProject
  onReassignWindow: typeof windowsReassignConnectionsAndDelete
  project: Project | undefined
  windowConnections: Connection[]
  projectConnections: Connection[]
  windows: Window[]
  currentWindow: Window
  sidebarOpen: boolean
}

export default function Header({
  project,
  onConnectionCreate,
  onConnectionRemove,
  windowConnections,
  projectConnections,
  windows,
  currentWindow,
  onConnectionToggleMaximize,
  onConnectionUpdateName,
  onSidebarToggle,
  onClearClosedWindows,
  onReassignWindow,
  sidebarOpen,
}: HeaderProps) {
  const popup = useContext(PopupContext)

  return (
    <header tw="w-full px-2 py-1 flex flex-row justify-between items-center">
      <div tw="flex flex-row items-center flex-shrink-0 w-40">
        <ButtonSecondary
          type="button"
          onClick={() => popup.push('Projects', ProjectsConnected)}
          title="Switch Project"
          tw="mr-2 flex items-center px-2 h-8 rounded-lg"
        >
          <FaTh />
        </ButtonSecondary>
        {project && (
          <button
            type="button"
            title="Toggle Sidebar"
            css={[
              tw`mr-4 flex items-center px-2 h-8 rounded-lg`,
              sidebarOpen && tw`bg-blue-700 dark:bg-blue-800 hover:bg-blue-600 hover:dark:bg-blue-700 text-white`,
              !sidebarOpen && tw`hover:bg-gray-300 hover:dark:bg-gray-800 text-blue-800 dark:text-blue-200`,
            ]}
            onClick={() => onSidebarToggle()}
          >
            <SidebarIcon />
          </button>
        )}
      </div>
      {project && (
        <div tw="px-4" data-tour="connection-list">
          <HeaderConnectionList
            windowConnections={windowConnections}
            projectConnections={projectConnections}
            windows={windows}
            onToggle={(connection) => onConnectionToggleMaximize(connection)}
            onClose={(connection) => onConnectionRemove(connection)}
            onCreate={() => onConnectionCreate(project)}
            onRename={(connection, name) => onConnectionUpdateName(connection, name)}
            onClearClosedWindows={() => onClearClosedWindows(project)}
            onReassignWindow={(window) => onReassignWindow(window, currentWindow)}
          />
        </div>
      )}
      <div tw="pr-1 flex items-end gap-x-2 items-center">
        <div tw="flex items-center">
          <ThemeSwitch />
        </div>
        <div tw="flex items-center">
          <HeaderRightHandDropdown />
        </div>
      </div>
    </header>
  )
}