import { projectUpdate } from '$redux/actions/projects'
import { currentProject } from '$redux/selectors/projects'
import type State from '$redux/state'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EditProject from './EditProject'

function mapStateToProps(state: State) {
  return {
    project: currentProject(state),
  }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(
    {
      onProjectChange: projectUpdate,
    },
    dispatch,
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProject)
