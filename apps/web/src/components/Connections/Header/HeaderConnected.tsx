import { socketConnect, socketDisconnect } from '$redux/actions/connection-sockets.ts'
import {
  connectionDisconnectSocketAndRemove,
  connectionMinimize,
  connectionUpdateAutoReconnect,
  connectionUpdateName,
  connectionUpdateProtocols,
  connectionUpdateSocketUrl,
} from '$redux/actions/connections.ts'
import type State from '$redux/state'
import { connect } from 'react-redux'
import { type Dispatch, bindActionCreators } from 'redux'
import Header from './Header'

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      onWebSocketUrlChange: connectionUpdateSocketUrl,
      onWebSocketNameChange: connectionUpdateName,
      onWebSocketProtocolsChange: connectionUpdateProtocols,
      onWebSocketAutoReconnectChange: connectionUpdateAutoReconnect,
      onWebSocketConnect: socketConnect,
      onWebSocketDisconnect: socketDisconnect,
      onClose: connectionDisconnectSocketAndRemove,
      onMinimize: connectionMinimize,
    },
    dispatch,
  )
}

function mapStateToProps(_state: State, { connection }: any) {
  return { connection }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
