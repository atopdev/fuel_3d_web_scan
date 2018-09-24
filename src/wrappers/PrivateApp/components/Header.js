import React from 'react';
import {
  Nav,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';
import { AppHeaderDropdown, AppNavbarBrand } from '@coreui/react';
import logo from '../../../assets/images/logo.png';

const Header = () =>  (
  <div>
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
          <DropdownItem onClick={() => this.props.logout()}><i className="icon-logout icons"></i> Logout</DropdownItem>
        </DropdownMenu>
      </AppHeaderDropdown>
    </Nav>
  </div>
);

export default Header;
