import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';
import auth from '../routes/Login/modules';
import app from '../wrappers/PrivateApp/modules';
import dashboard from '../routes/Dashboard/modules';
import face from '../routes/Face/modules';

const rootReducer = combineReducers({
  router: routerReducer,
  form: formReducer,
  toastr: toastrReducer,
  auth,
  app,
  dashboard,
  face,
});

export default rootReducer;
