import { socketSend } from '$redux/actions/connection-sockets.ts'
import { savedPayloadCreateFromTab, savedPayloadUpdate } from '$redux/actions/saved-payloads.ts'
import { tabClose, tabCreate, tabSwitch, tabUpdateContent } from '$redux/actions/tabs.ts'
import { currentProject } from '$redux/selectors/projects.ts'
import { tabsForConnection } from '$redux/selectors/tabs.ts'
import type State from '$redux/state'
import { connect } from 'react-redux'
import { type Dispatch, bindActionCreators } from 'redux'
import Editor from './Editor'

function mapStateToProps(state: State, props: any) {
  return {
    tabs: tabsForConnection(state, props.connection.id),
    project: currentProject(state),
    savedPayloads: state.savedPayloads,
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      onCloseTab: tabClose,
      onSwitchTab: tabSwitch,
      onCreateTab: tabCreate,
      onTabContentChange: tabUpdateContent,
      onCreateSavedPayload: savedPayloadCreateFromTab,
      onSavedPayloadChange: savedPayloadUpdate,
      onWebSocketSend: socketSend,
    },
    dispatch,
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
