import { connect } from 'react-redux';
import Face from '../components/Face';
import {
  loadFace,
  showAnalyzeView,
  updateTexture,
  resetData,
  analyzeFace,
} from '../modules/actions';

export default connect(
  ({ face, router }) => ({ ...router, ...face }),
  (dispatch) => ({
    loadFace: (faceId, element) => dispatch(loadFace(faceId, element)),
    showAnalyzeView: () => dispatch(showAnalyzeView()),
    updateTexture: (texture) => dispatch(updateTexture(texture)),
    resetData: () => dispatch(resetData()),
    analyzeFace: () => dispatch(analyzeFace()),
  }),
)(Face);
