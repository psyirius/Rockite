import { projectCreate, projectRemoveRelatedItemsAndDelete } from '$redux/actions/projects'
import { userInterfaceProjectSwitch } from '$redux/actions/user-interface-properties'
import { allProjects } from '$redux/selectors/projects'
import type State from '$redux/state'
import { connect } from 'react-redux'
import { type Dispatch, bindActionCreators } from 'redux'
import Projects from './Projects'

function mapStateToProps(state: State) {
  return {
    projects: allProjects(state),
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      onCreate: projectCreate,
      onSwitch: userInterfaceProjectSwitch,
      onDelete: projectRemoveRelatedItemsAndDelete,
    },
    dispatch,
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects)
