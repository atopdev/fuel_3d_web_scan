import { toastr } from 'react-redux-toastr';
import {
  DASHBOARD_LOAD_REQUEST,
  DASHBOARD_LOAD_SUCCESS,
  DASHBOARD_LOAD_ERROR,
} from './index';
import { authorizedRequest } from '../../../utils/apiCaller';

export const loadFaces = () => {
  return async (dispatch) => {
    dispatch({ type: DASHBOARD_LOAD_REQUEST });
    try {
      const response = await authorizedRequest('get', '/faces');
      dispatch({ type: DASHBOARD_LOAD_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: DASHBOARD_LOAD_ERROR,
        error,
      });
      toastr.error(error.response.data.message);
    }
  };
};
