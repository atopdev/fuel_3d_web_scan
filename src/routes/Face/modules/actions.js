import {
  FACE_INITIALIZE,
  FACE_LOAD_REQUEST,
  FACE_LOAD_SUCCESS,
  FACE_LOAD_ERROR,
  FACE_RESET_DATA,
} from './index';
import { anonymousRequest } from '../../../utils/apiCaller';

export const initialize = (element) => {
  return (dispatch) => {
    dispatch({
      type: FACE_INITIALIZE,
      payload: {
        element,
        load: () => {
          dispatch(loadFace());
        },
      }
    })
  };
};

export const loadFace = () => {
  return async (dispatch, getState) => {
    dispatch({ type: FACE_LOAD_REQUEST });
    try {
      window.localStorage.setItem('fuel_3d_web_scan_last_time', Date.now());
      const response = await anonymousRequest('get', '/faces/load');
      dispatch({ type: FACE_LOAD_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: FACE_LOAD_ERROR,
        error,
      });
      console.log(error);
    }
  };
};

export const resetData = () => {
  return {
    type: FACE_RESET_DATA,
  };
};
