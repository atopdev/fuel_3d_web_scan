import { toastr } from 'react-redux-toastr';
import {
  FACE_LOAD_REQUEST,
  FACE_LOAD_SUCCESS,
  FACE_LOAD_ERROR,
  FACE_ANALYZE_VIEW,
  FACE_UPDATE_TEXTURE,
  FACE_RESET_DATA,
  FACE_ANALYZE_REQUEST,
  FACE_ANALYZE_SUCCESS,
  FACE_ANALYZE_ERROR,
} from './index';
import { authorizedRequest } from '../../../utils/apiCaller';
import ThreeEntryPoint from '../components/ThreeEntryPoint';

export const loadFace = (faceId, element) => {
  return async (dispatch) => {
    dispatch({ type: FACE_LOAD_REQUEST });
    try {
      const response = await authorizedRequest('get', `/faces/${faceId}`);
      const { data: face } = response;
      const threeEntryPoint = new ThreeEntryPoint(element, face);
      dispatch({ type: FACE_LOAD_SUCCESS, payload: { face, threeEntryPoint } });
    } catch (error) {
      dispatch({
        type: FACE_LOAD_ERROR,
        error,
      });
      toastr.error(error.response.data.message);
    }
  };
};

export const showAnalyzeView = () => {
  return {
    type: FACE_ANALYZE_VIEW,
  };
};

export const updateTexture = (texture) => {
  return {
    type: FACE_UPDATE_TEXTURE,
    payload: texture,
  };
};

export const resetData = () => {
  return {
    type: FACE_RESET_DATA,
  };
};

export const analyzeFace = () => {
  return async (dispatch, getState) => {
    dispatch({ type: FACE_ANALYZE_REQUEST });
    try {
      const { face: { face: { id: faceId } } } = getState();
      const response = await authorizedRequest('get', `/faces/${faceId}/analyze`);
      const { similarity, match } = response.data;
      dispatch({ type: FACE_ANALYZE_SUCCESS, payload: { similarity, match } });
    } catch (error) {
      dispatch({
        type: FACE_ANALYZE_ERROR,
        error,
      });
      toastr.error(error.response.data.message);
    }
  };
};
