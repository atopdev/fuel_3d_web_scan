export const FACE_LOAD_REQUEST = 'FACE_LOAD_REQUEST';
export const FACE_LOAD_SUCCESS = 'FACE_LOAD_SUCCESS';
export const FACE_LOAD_ERROR = 'FACE_LOAD_ERROR';
export const FACE_ANALYZE_VIEW = 'FACE_ANALYZE_VIEW';
export const FACE_UPDATE_TEXTURE = 'FACE_UPDATE_TEXTURE';
export const FACE_RESET_DATA = 'FACE_RESET_DATA';
export const FACE_ANALYZE_REQUEST = 'FACE_ANALYZE_REQUEST';
export const FACE_ANALYZE_SUCCESS = 'FACE_ANALYZE_SUCCESS';
export const FACE_ANALYZE_ERROR = 'FACE_ANALYZE_ERROR';

const initialState = {
  loading: false,
  face: null,
  error: null,
  analyzeView: false,
  threeEntryPoint: null,
  texture: '',
  analyzing: true,
  similarity: null,
  matchValue: 0,
  analyzingError: null,
};

const face = (state = initialState, action) => {
  switch(action.type) {
    case FACE_LOAD_REQUEST:
      return { ...state, loading: true, face: null, error: null };

    case FACE_LOAD_SUCCESS:
      return { ...state, loading: false, face: action.payload.face, threeEntryPoint: action.payload.threeEntryPoint };

    case FACE_LOAD_ERROR:
      return { ...state, loading: false, error: action.error };

    case FACE_ANALYZE_VIEW:
      return { ...state, analyzeView: true };

    case FACE_UPDATE_TEXTURE:
      let { texture, threeEntryPoint } = state;
      if (texture === action.payload) {
        texture = '';
      } else {
        texture = action.payload;
      }
      threeEntryPoint.updateTexture(texture);

      return { ...state, texture, threeEntryPoint };

    case FACE_RESET_DATA:
      return { ...initialState };

    case FACE_ANALYZE_REQUEST:
      return { ...state, analyzing: true, similarity: null, matchValue: 0, analyzingError: null };

    case FACE_ANALYZE_SUCCESS:
      return { ...state, analyzing: false, similarity: action.payload.similarity, matchValue: action.payload.match };

    case FACE_ANALYZE_ERROR:
      return { ...state, analyzing: false, analyzingError: action.error };

    default:
      return state;
  }
};

export default face;
