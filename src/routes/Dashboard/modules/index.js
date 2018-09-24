export const DASHBOARD_LOAD_REQUEST = 'DASHBOARD_LOAD_REQUEST';
export const DASHBOARD_LOAD_SUCCESS = 'DASHBOARD_LOAD_SUCCESS';
export const DASHBOARD_LOAD_ERROR = 'DASHBOARD_LOAD_ERROR';

const initialState = {
  loading: false,
  faces: null,
  error: null,
};

const dashboard = (state = initialState, action) => {
  switch(action.type) {
    case DASHBOARD_LOAD_REQUEST:
      return { ...state, loading: true, faces: null, error: null };

    case DASHBOARD_LOAD_SUCCESS:
      return { ...state, loading: false, faces: action.payload };

    case DASHBOARD_LOAD_ERROR:
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
};

export default dashboard;
