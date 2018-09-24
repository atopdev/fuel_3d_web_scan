import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import App from './wrappers/App';
import registerServiceWorker from './registerServiceWorker';

// require('dotenv').config();

ReactDOM.render(
  (<Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>),
  document.getElementById('root'),
);
registerServiceWorker();
