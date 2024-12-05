import { eventsRemoveForConnection } from '$redux/actions/events'
import { tabCreate } from '$redux/actions/tabs'
import { eventsForConnection } from '$redux/selectors/events'
import { currentProject } from '$redux/selectors/projects'
import type State from '$redux/state'
import { connect } from 'react-redux'
import { type Dispatch, bindActionCreators } from 'redux'
import Events from './Events'

function mapStateToProps(state: State, props: any) {
  return {
    events: eventsForConnection(state, props.connection),
    formatEventPayloads: currentProject(state).formatEventPayloads,
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      onClear: eventsRemoveForConnection,
      onCreateInTab: tabCreate,
    },
    dispatch,
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Events)
