import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { projectUpdate } from '$redux/actions/projects.ts';
import EditProject from './EditProject';
import State from '$redux/state';
import { currentProject } from '$redux/selectors/projects.ts';

function mapStateToProps(state: State) {
  return {
    project: currentProject(state),
  };
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(
    {
      onProjectChange: projectUpdate,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProject);
