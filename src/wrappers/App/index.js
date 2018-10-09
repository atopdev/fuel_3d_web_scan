import React from 'react';
import { Route, Switch } from 'react-router-dom';

import '@coreui/icons/css/coreui-icons.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/css/simple-line-icons.css';
import '../../assets/scss/style.css';

import Face from '../../routes/Face';

const App = () => (
  <div>
    <Switch>
      <Route path="/" component={Face} />
    </Switch>
  </div>
);

export default App;
