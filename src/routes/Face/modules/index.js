import ThreeEntryPoint from '../components/ThreeEntryPoint';
export const FACE_INITIALIZE = 'FACE_INITIALIZE';
export const FACE_LOAD_REQUEST = 'FACE_LOAD_REQUEST';
export const FACE_LOAD_SUCCESS = 'FACE_LOAD_SUCCESS';
export const FACE_LOAD_ERROR = 'FACE_LOAD_ERROR';
export const FACE_RESET_DATA = 'FACE_RESET_DATA';

const initialState = {
  loading: false,
  face: null,
  error: null,
  threeEntryPoint: null,
  initialized: false,
};

const face = (state = initialState, action) => {
  let threeEntryPoint;
  switch(action.type) {
    case FACE_INITIALIZE:
      threeEntryPoint = new ThreeEntryPoint(action.payload.element, action.payload.load);
      return { ...state, threeEntryPoint };

    case FACE_LOAD_REQUEST:
      return { ...state, loading: true, error: null };

    case FACE_LOAD_SUCCESS:
      threeEntryPoint = state.threeEntryPoint;
      threeEntryPoint.loadModel(action.payload);
      return { ...state, loading: false, face: action.payload, threeEntryPoint, initialized: true };

    case FACE_LOAD_ERROR:
      return { ...state, loading: false, error: action.error };

    case FACE_RESET_DATA:
      return { ...initialState };

    default:
      return state;
  }
};

export default face;
