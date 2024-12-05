import 'twin.macro'
import type Connection from '$models/connection'
import type Project from '$models/project'
import type SavedPayload from '$models/saved-payload'
import SavedPayloadValidator from '$models/saved-payload/validator'
import type TabModel from '$models/tab'
import { PopupContext } from '$providers/PopupProvider'
import type { socketSend } from '$redux/actions/connection-sockets'
import type { savedPayloadCreateFromTab, savedPayloadUpdate } from '$redux/actions/saved-payloads'
import type { tabClose, tabCreate, tabSwitch, tabUpdateContent } from '$redux/actions/tabs'
import { useContext } from 'react'
import { MdAdd } from 'react-icons/md'
import PopupPrompt from '../../General/PopupPresets/PopupPrompt'
import ButtonSecondary from '../../General/Styled/ButtonSecondary'
import EditorContent from './EditorContent'
import Tab from './EditorTab'

export interface EditorProps {
  connection: Connection
  project: Project
  tabs: TabModel[]
  savedPayloads: { [key: string]: SavedPayload }
  onCloseTab: typeof tabClose
  onSwitchTab: typeof tabSwitch
  onCreateTab: typeof tabCreate
  onTabContentChange: typeof tabUpdateContent
  onCreateSavedPayload: typeof savedPayloadCreateFromTab
  onSavedPayloadChange: typeof savedPayloadUpdate
  onWebSocketSend: typeof socketSend
}

export default function Editor({
  connection,
  project,
  tabs,
  savedPayloads,
  onCloseTab,
  onSwitchTab,
  onCreateTab,
  onTabContentChange,
  onCreateSavedPayload,
  onSavedPayloadChange,
  onWebSocketSend,
}: EditorProps) {
  const popup = useContext(PopupContext)

  const selectedTab = tabs.find((tab) => tab.selected)!

  const selectedSavedPayload = Object.values(savedPayloads).find(
    (savedPayload) => selectedTab.savedPayloadId === savedPayload.id,
  )

  return (
    <div data-tour="connection-editor">
      <div tw="flex flex-wrap w-full overflow-x-auto overflow-y-hidden">
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            tab={tab}
            savedPayload={savedPayloads[tab.savedPayloadId!]}
            showClose={tabs.length > 1}
            onClose={() => onCloseTab(tab)}
            onSwitch={() => onSwitchTab(tab)}
          />
        ))}
        <ButtonSecondary
          type="button"
          title="New Tab"
          tw="px-2 py-2 cursor-pointer flex items-center"
          onClick={() => onCreateTab(connection)}
        >
          <MdAdd />
        </ButtonSecondary>
      </div>
      <EditorContent
        connection={connection}
        selectedTab={selectedTab}
        selectedSavedPayload={selectedSavedPayload}
        onSend={(content) => onWebSocketSend(connection, content)}
        onSave={(tab) => onSavedPayloadChange(selectedSavedPayload!, { content: tab.content })}
        onSaveAs={async (tab) => {
          const name = await popup.push<string>('Save Payload', PopupPrompt, {
            label: 'Payload Name',
            submitLabel: 'Save',
            yupValidator: SavedPayloadValidator.name,
            maxLength: SavedPayloadValidator.nameLength,
          })

          if (name?.length) {
            onCreateSavedPayload(project, connection, tab, name)
          }
        }}
        onTabContentChanged={(tab, content) => onTabContentChange(tab, content)}
      />
    </div>
  )
}
