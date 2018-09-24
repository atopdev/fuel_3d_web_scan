import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard';
import { loadFaces } from '../modules/actions';

export default connect(
  ({ dashboard }) => ({ ...dashboard }),
  (dispatch) => ({
    loadFaces: () => dispatch(loadFaces()),
  }),
)(Dashboard);
