import ThreeEntryPoint from '../components/ThreeEntryPoint';
export const FACE_INITIALIZE = 'FACE_INITIALIZE';
export const FACE_LOAD_REQUEST = 'FACE_LOAD_REQUEST';
export const FACE_LOAD_SUCCESS = 'FACE_LOAD_SUCCESS';
export const FACE_LOAD_ERROR = 'FACE_LOAD_ERROR';
export const FACE_UPDATE_TEXTURE = 'FACE_UPDATE_TEXTURE';
export const FACE_RESET_DATA = 'FACE_RESET_DATA';
export const FACE_STOP_ANIMATION = 'FACE_STOP_ANIMATION';

const initialState = {
  loading: false,
  face: null,
  error: null,
  threeEntryPoint: null,
  texture: '',
  initialized: false,
};

const face = (state = initialState, action) => {
  let threeEntryPoint;
  switch(action.type) {
    case FACE_INITIALIZE:
      threeEntryPoint = new ThreeEntryPoint(action.payload);
      return { ...state, threeEntryPoint };

    case FACE_LOAD_REQUEST:
      return { ...state, loading: true, error: null };

    case FACE_LOAD_SUCCESS:
      threeEntryPoint = state.threeEntryPoint;
      threeEntryPoint.loadModel(action.payload);
      return { ...state, loading: false, face: action.payload, threeEntryPoint, initialized: true };

    case FACE_LOAD_ERROR:
      return { ...state, loading: false, error: action.error };

    case FACE_UPDATE_TEXTURE:
      threeEntryPoint = state.threeEntryPoint;
      threeEntryPoint.updateTexture(action.payload);

      return { ...state, texture: action.payload, threeEntryPoint };

    case FACE_STOP_ANIMATION:
      threeEntryPoint = state.threeEntryPoint;
      threeEntryPoint.stopAnimation();

      return { ...state, threeEntryPoint };

    case FACE_RESET_DATA:
      return { ...initialState };

    default:
      return state;
  }
};

export default face;
