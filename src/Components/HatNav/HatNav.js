import firebase from 'firebase/app';
import 'firebase/auth';

import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
 } from 'reactstrap';
import PropTypes from 'prop-types';


class MyNavbar extends React.Component {
  state ={ 
    isOpen: false,
  }
  static propTypes = {
    authed: PropTypes.bool.isRequired,
  }

  toggle() {
    this.setState({
      isOpen: this.state.isOpen,
    });
  }

logMeOut = (e) => {
  e.preventDefault();
  firebase.auth().signOut();
}

render() {
  const { authed } = this.props;
  const buildNavbar = () => {
    if (authed) {
      return (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink onClick={this.logMeOut}>Logout</NavLink>
          </NavItem>
        </Nav>
      );
    }
    return <Nav className="ml-auto" navbar />
  };
  return (
    <div className="MyNavbar">
      <Navbar color="light" light expand="md">
          <NavbarBrand href="/">CAPstone</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {buildNavbar()}
          </Collapse>
        </Navbar>
    </div>
  );
}
}

export default MyNavbar;
