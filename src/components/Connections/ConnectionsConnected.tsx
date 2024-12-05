import { connectionsMaximizedForWindow, connectionsMinimizedForWindow } from '$redux/selectors/connections'
import type State from '$redux/state'
import { connect } from 'react-redux'
import Connections from './Connections'

function mapStateToProps(state: State) {
  return {
    connectionsMaximized: connectionsMaximizedForWindow(state),
    connectionsMinimized: connectionsMinimizedForWindow(state),
  }
}

export default connect(mapStateToProps)(Connections)
