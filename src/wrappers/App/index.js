import React from 'react';
import ReduxToastr from 'react-redux-toastr';
import { Switch, Redirect } from 'react-router-dom';

import '@coreui/icons/css/coreui-icons.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/css/simple-line-icons.css';
import '../../assets/scss/style.css';

import GuestRoute from '../../route-helpers/GuestRoute';
import PrivateRoute from '../../route-helpers/PrivateRoute';

import Login from '../../routes/Login';
import PrivateApp from '../PrivateApp';

const App = () => (
  <div>
    <Switch>
      <GuestRoute exact path="/login" name="Login" component={Login} />
      <PrivateRoute path="/" component={PrivateApp} />
      <Redirect from="*" to="/login" />
    </Switch>
    <ReduxToastr
      timeOut={3000}
      preventDuplicates
      position="bottom-right"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
    />
  </div>
);

export default App;
