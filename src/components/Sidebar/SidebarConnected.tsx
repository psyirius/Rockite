import { connectionCreateFromSavedPayload } from '$redux/actions/connections'
import { savedPayloadRemove } from '$redux/actions/saved-payloads'
import { tabCreateFromSavedPayload } from '$redux/actions/tabs'
import { connectionsForWindow } from '$redux/selectors/connections'
import { currentProject } from '$redux/selectors/projects'
import { savedPayloadsForCurrentProject } from '$redux/selectors/savedPayloads'
import type State from '$redux/state'
import { connect } from 'react-redux'
import { type Dispatch, bindActionCreators } from 'redux'
import Sidebar from './Sidebar'

function mapStateToProps(state: State) {
  return {
    savedPayloads: savedPayloadsForCurrentProject(state),
    connections: connectionsForWindow(state),
    project: currentProject(state) || null,
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      onCreateConnectionFromSavedPayload: connectionCreateFromSavedPayload,
      onCreateTabFromSavedPayload: tabCreateFromSavedPayload,
      onSavedPayloadDelete: savedPayloadRemove,
    },
    dispatch,
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
