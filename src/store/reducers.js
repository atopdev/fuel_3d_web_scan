import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import face from '../routes/Face/modules';

const rootReducer = combineReducers({
  router: routerReducer,
  face,
});

export default rootReducer;
