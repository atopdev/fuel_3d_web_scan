import { toastr } from 'react-redux-toastr';
import {
  FACE_INITIALIZE,
  FACE_LOAD_REQUEST,
  FACE_LOAD_SUCCESS,
  FACE_LOAD_ERROR,
  FACE_UPDATE_TEXTURE,
  FACE_STOP_ANIMATION,
  FACE_RESET_DATA,
} from './index';
import { authorizedRequest } from '../../../utils/apiCaller';

export const initialize = (element) => {
  return {
    type: FACE_INITIALIZE,
    payload: element,
  };
};

export const loadFace = () => {
  return async (dispatch, getState) => {
    dispatch({ type: FACE_LOAD_REQUEST });
    try {
      const lastTime = Date.now();
      const response = await authorizedRequest('get', '/faces/load');
      const { data: face } = response;
      const currentTime = Date.now();
      const { face: initialized } = getState();
      let timeInterval = currentTime - lastTime;
      if (!initialized || timeInterval >= 10000) {
        timeInterval = 0;
      } else {
        timeInterval = 10000 - timeInterval;
      }
      setTimeout(() => {
        dispatch({ type: FACE_LOAD_SUCCESS, payload: face });
        setTimeout(() => {
          dispatch(updateTexture('origin'));
          setTimeout(() => {
            dispatch({ type: FACE_STOP_ANIMATION });
            dispatch(loadFace());
          }, 15000);
        }, 15000);
      }, timeInterval);
    } catch (error) {
      dispatch({
        type: FACE_LOAD_ERROR,
        error,
      });
      toastr.error(error.response.data.message);
    }
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
