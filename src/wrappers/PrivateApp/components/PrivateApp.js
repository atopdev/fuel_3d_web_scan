import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  AppFooter,
  AppHeader,
  AppHeaderDropdown,
  AppNavbarBrand,
} from '@coreui/react';
import {
  Nav,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';

import Dashboard from '../../../routes/Dashboard';
import Face from '../../../routes/Face';

import logo from '../../../assets/images/logo.png';

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
        <AppHeader fixed>
          <AppNavbarBrand
            full={{ src: logo, width: 89, height: 25, alt: 'Fuel3D' }}
            minimized={{ src: logo, width: 30, height: 30, alt: 'Fuel3D' }}
          />
          <Nav className="ml-auto mr-2" navbar>
            <AppHeaderDropdown direction="down">
              <DropdownToggle nav>
                <i className="icon-menu icons font-2xl"></i>
              </DropdownToggle>
              <DropdownMenu right style={{ right: 'auto' }}>
                <DropdownItem onClick={() => this.props.logoutUser()}><i className="icon-logout icons"></i> Logout</DropdownItem>
              </DropdownMenu>
            </AppHeaderDropdown>
          </Nav>
        </AppHeader>
        <div className="app-body">
          <main className="main">
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/:faceId" component={Face} />
            </Switch>
          </main>
        </div>
        <AppFooter>
          <span>&copy; 2018 Fuel3D Face Demo App</span>
          <span className="ml-auto">Powered by <a href="javascript:void(0);">Fuel3D</a></span>
        </AppFooter>
      </div>
    );
  }
}

export default PrivateApp;
