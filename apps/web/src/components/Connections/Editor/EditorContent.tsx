import type Connection from '$models/connection'
import { ConnectionSocketStatus } from '$models/connection'
import type SavedPayload from '$models/saved-payload'
import type Tab from '$models/tab'
import { useEffect, useState } from 'react'
import Editor from '../../General/Editor/Editor'
import ButtonPrimary from '../../General/Styled/ButtonPrimary'
import ButtonSecondary from '../../General/Styled/ButtonSecondary'

export interface EditorContentProps {
  connection: Connection
  selectedTab: Tab
  selectedSavedPayload: SavedPayload | undefined
  onSave: (tab: Tab) => void
  onSaveAs: (tab: Tab) => void
  onSend: (content: string) => void
  onTabContentChanged: (tab: Tab, content: string) => void
}

export default function EditorContent({
  connection,
  selectedTab,
  selectedSavedPayload,
  onSave,
  onSaveAs,
  onSend,
  onTabContentChanged,
}: EditorContentProps) {
  const [content, setContent] = useState<string>(selectedTab?.content)

  useEffect(() => {
    if (selectedTab) {
      setContent(selectedTab.content)
    }
  }, [selectedTab, selectedSavedPayload])

  if (!selectedTab) {
    return null
  }

  return (
    <>
      <label>
        <span className="sr-only">Payload</span>
        <div className="mt-2 px-4">
          <Editor
            value={content}
            onChange={(newContent) => setContent(newContent)}
            onBlur={() => onTabContentChanged(selectedTab, content)}
            onKeyDown={(event) => {
              // On Shift + Enter, send the payload
              if (event.key === 'Enter' && event.shiftKey) {
                event.preventDefault()
                onSend(content)
              }
            }}
            minLines={2}
            maxLines={8}
            placeholder="Payload"
          />
        </div>
      </label>
      <div className="flex my-2 px-4">
        <ButtonPrimary
          type="button"
          disabled={connection.socketStatus !== ConnectionSocketStatus.Connected}
          className="py-1 px-4 mr-2 rounded"
          onClick={() => onSend(selectedTab.content)}
        >
          Send
        </ButtonPrimary>
        {selectedSavedPayload && selectedTab.content === selectedSavedPayload.content && (
          <button type="button" className="px-4 text-gray-400 cursor-default text-xs" disabled>
            Saved
          </button>
        )}
        {selectedSavedPayload && selectedTab.content !== selectedSavedPayload.content && (
          <>
            <ButtonSecondary type="button" className="px-4 rounded text-xs" onClick={() => onSave(selectedTab)}>
              Save
            </ButtonSecondary>
            <ButtonSecondary
              type="button"
              className="px-4 rounded text-xs"
              onClick={() => onTabContentChanged(selectedTab, selectedSavedPayload.content)}
            >
              Discard Changes
            </ButtonSecondary>
          </>
        )}
        {selectedTab.content?.length > 0 && (
          <ButtonSecondary type="button" className="px-4 rounded text-xs" onClick={() => onSaveAs(selectedTab)}>
            Save As
          </ButtonSecondary>
        )}
      </div>
    </>
  )
}
