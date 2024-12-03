import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import Events from './Events';
import State from '$redux/state';
import { eventsRemoveForConnection } from '$redux/actions/events.ts';
import { eventsForConnection } from '$redux/selectors/events.ts';
import { tabCreate } from '$redux/actions/tabs.ts';
import { currentProject } from '$redux/selectors/projects.ts';

function mapStateToProps(state: State, props: any) {
  return {
    events: eventsForConnection(state, props.connection),
    formatEventPayloads: currentProject(state).formatEventPayloads,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      onClear: eventsRemoveForConnection,
      onCreateInTab: tabCreate,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Events);
