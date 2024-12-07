import ConnectionsConnected from '$components/Connections/ConnectionsConnected'
import EmptyMessage from '$components/General/Utilities/EmptyMessage'
import HeaderConnected from '$components/Header/HeaderConnected'
import SidebarConnected from '$components/Sidebar/SidebarConnected'
import { Toaster } from 'sonner'

export interface LayoutProps {
  sidebarOpen: boolean
  projectOpen: boolean
  projectsExist: boolean
}

export default function Layout({ sidebarOpen, projectOpen, projectsExist }: LayoutProps) {
  return (
    <>
      <div className={'flex flex-col h-full'}>
        <div className="flex-grow-0">
          <HeaderConnected />
        </div>

        <div className="flex flex-grow pb-2">
          {projectOpen && (
            <>
              {sidebarOpen && (
                <div className="pr-2 flex flex-grow min-w-xs max-w-lg w-1/3 lg:w-1/4">
                  <SidebarConnected />
                </div>
              )}
              <ConnectionsConnected paddingLeft={!sidebarOpen} />
            </>
          )}
          {!projectOpen && !projectsExist && (
            <EmptyMessage heading="No Projects Exist">
              Click the projects button in the top left to create one.
            </EmptyMessage>
          )}
          {!projectOpen && projectsExist && (
            <EmptyMessage heading="No Project Open">
              Click the projects button in the top left to open one.
            </EmptyMessage>
          )}
        </div>
      </div>
      <Toaster />
    </>
  )
}
