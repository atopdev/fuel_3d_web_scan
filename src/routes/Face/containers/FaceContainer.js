import { connect } from 'react-redux';
import Face from '../components/Face';
import {
  initialize,
  loadFace,
  resetData,
} from '../modules/actions';

export default connect(
  ({ face, router }) => ({ ...router, ...face }),
  (dispatch) => ({
    initialize: (element) => dispatch(initialize(element)),
    loadFace: () => dispatch(loadFace()),
    resetData: () => dispatch(resetData()),
  }),
)(Face);
