import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Face from '../../../routes/Face';

class PrivateApp extends React.Component {
  componentDidMount() {
    this.props.loadProfile();
  }

  render() {
    const { loading } = this.props;

    if(loading) {
      return <div>loading...</div>
    }

    return (
      <div className="app">
        <div className="app-body">
          <main className="main">
            <Switch>
              <Route exact path="/" component={Face} />
            </Switch>
          </main>
        </div>
      </div>
    );
  }
}

export default PrivateApp;
