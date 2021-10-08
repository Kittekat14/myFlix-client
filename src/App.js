import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MainView from './components/main-view/main-view';
import * as actionCreators from './actions/actions';


function mapStateToProps(state) {
  return {
    movies: state.movies,
    visibilityFilter: state.visibilityFilter,
    user: state.user
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(MainView);
export default App; 

