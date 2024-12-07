import useArrayFilter from '$hooks/useArrayFilter'
import type Connection from '$models/connection'
import type Project from '$models/project'
import type SavedPayload from '$models/saved-payload'
import { PopupContext } from '$providers/PopupProvider'
import type { connectionCreateFromSavedPayload } from '$redux/actions/connections'
import type { savedPayloadRemove } from '$redux/actions/saved-payloads'
import type { tabCreateFromSavedPayload } from '$redux/actions/tabs'
import { motion } from 'motion/react'
import { useContext, useState } from 'react'
import { FiEdit3 } from 'react-icons/fi'
import { GoPlus } from 'react-icons/go'
import CreateEditPayloadConnected from '../CreateEditPayload/CreateEditPayloadConnected'
import EditProjectReduxWrapper from '../EditProject/EditProjectReduxWrapper'
import ButtonSecondary from '../General/Styled/ButtonSecondary'
import EmptyMessage from '../General/Utilities/EmptyMessage'
import Heading from '../General/Utilities/Heading'
import SavedPayloadList from './SavedPayloadList'
import SidebarSearch from './SidebarSearch'

export interface SidebarProps {
  savedPayloads: SavedPayload[]
  connections: Connection[]
  project: Project
  onCreateConnectionFromSavedPayload: typeof connectionCreateFromSavedPayload
  onCreateTabFromSavedPayload: typeof tabCreateFromSavedPayload
  onSavedPayloadDelete: typeof savedPayloadRemove
}

export default function Sidebar({
  savedPayloads,
  connections,
  project,
  onCreateConnectionFromSavedPayload,
  onCreateTabFromSavedPayload,
  onSavedPayloadDelete,
}: SidebarProps) {
  const popup = useContext(PopupContext)
  const [query, setQuery] = useState<string>('')

  const filteredSavedPayloads = useArrayFilter<SavedPayload>(savedPayloads, query, (payload) => payload.name)

  const openCreatePayload = async () => {
    await popup.push('Create Payload', CreateEditPayloadConnected, { project })
  }

  return (
    <motion.div
      initial={{ x: -500 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.15, ease: 'circOut' }}
      className="flex flex-col w-full bg-white dark:bg-gray-850 rounded-r-lg border border-gray-250 dark:border-gray-700 border-l-0 overflow-hidden"
    >
      <div className="bg-gray-200 dark:bg-gray-900 border-b dark:border-gray-800 py-2 pl-4 pr-2">
        <div className="flex items-center justify-between pb-1">
          <span className="font-semibold select-text text-gray-900 dark:text-gray-100">{project.name}</span>
          <ButtonSecondary
            type="button"
            className="p-2 rounded"
            title="Edit Project"
            onClick={() => popup.push('Edit Project', EditProjectReduxWrapper, { project })}
          >
            <FiEdit3 className="self-center" />
          </ButtonSecondary>
        </div>
        <div className="mr-2">
          <SidebarSearch onChange={(newQuery) => setQuery(newQuery)} value={query} />
        </div>
      </div>
      <div className="flex-1 relative">
        <div className="absolute inset-0 overflow-y-auto flex flex-col" data-tour="saved-payloads">
          <Heading
            buttons={[
              {
                icon: <GoPlus />,
                alt: 'Create',
                onClick: () => openCreatePayload(),
              },
            ]}
          >
            Saved Payloads
          </Heading>
          {savedPayloads.length > 0 && (
            <SavedPayloadList
              savedPayloads={filteredSavedPayloads}
              connections={connections}
              onDelete={(savedPayload) => onSavedPayloadDelete(savedPayload)}
              onOpen={(savedPayload, connection) => onCreateTabFromSavedPayload(connection, savedPayload)}
              onOpenInNewConnection={(savedPayload) => onCreateConnectionFromSavedPayload(savedPayload)}
            />
          )}
          {savedPayloads.length === 0 && (
            <EmptyMessage heading="No Saved Payloads" buttonText="Create" buttonOnClick={() => openCreatePayload()}>
              {'Create one or use the "Save As" button on a connection.'}
            </EmptyMessage>
          )}
        </div>
      </div>
    </motion.div>
  )
}
