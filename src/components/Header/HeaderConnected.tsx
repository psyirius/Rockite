import {
  connectionCreate,
  connectionDisconnectSocketAndRemove,
  connectionToggleMaximize,
  connectionUpdateName,
} from '$redux/actions/connections'
import { userInterfaceSidebarToggle } from '$redux/actions/user-interface-properties'
import { windowsReassignConnectionsAndDelete, windowsRemoveClosedForProject } from '$redux/actions/windows'
import { connectionsForProject, connectionsForWindow } from '$redux/selectors/connections'
import { currentProject } from '$redux/selectors/projects'
import { closedWindowsForProject, currentWindow } from '$redux/selectors/windows'
import type State from '$redux/state'
import { connect } from 'react-redux'
import { type Dispatch, bindActionCreators } from 'redux'
import Header from './Header'

export function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      onConnectionCreate: connectionCreate,
      onConnectionToggleMaximize: connectionToggleMaximize,
      onConnectionRemove: connectionDisconnectSocketAndRemove,
      onConnectionUpdateName: connectionUpdateName,
      onSidebarToggle: userInterfaceSidebarToggle,
      onClearClosedWindows: windowsRemoveClosedForProject,
      onReassignWindow: windowsReassignConnectionsAndDelete,
    },
    dispatch,
  )
}

export function mapStateToProps(state: State) {
  const project = currentProject(state)

  return {
    project,
    projectConnections: connectionsForProject(state),
    windowConnections: connectionsForWindow(state),
    windows: closedWindowsForProject(state),
    currentWindow: currentWindow(state),
    sidebarOpen: state.userInterfaceProperties.SidebarOpen.value,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
