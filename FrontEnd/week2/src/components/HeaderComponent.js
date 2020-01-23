import React, { Component, Fragment } from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  Jumbotron
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {
  state = {
    isNavOpen: false
  };

  toogleNav = () => {
    this.setState({ isNavOpen: !this.state.isNavOpen });
  };

  render() {
    return (
      <Fragment>
        <Navbar dark expand="md">
          <div className="container">
            <NavbarToggler onClick={this.toogleNav} />
            <NavbarBrand className="mr-auto" href="/">
              <img
                src="assets/images/logo.png"
                height="30"
                width="41"
                alt="Ristorante Con Fusion"
                title="Ristorante Con Fusion"
              />
            </NavbarBrand>

            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink className="nav-link" to="/home">
                    <span className="fa fa-home fa-lg" /> Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/aboutus">
                    <span className="fa fa-info fa-lg" /> About Us
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/menu">
                    <span className="fa fa-list fa-lg" /> Menu
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/contactus">
                    <span className="fa fa-address'card fa-lg" /> Contact Us
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
        <Jumbotron>
          <div className="container">
            <div className="row row-header">
              <div className="col-12 col-sm-6">
                <h1>Ristorante Con Fusion</h1>
                <p>
                  We take inspiration from the World's best cuisines, and create
                  a unique fusion experience. Our lipsmacking creations will
                  tickle your culinary senses!
                </p>
              </div>
            </div>
          </div>
        </Jumbotron>
      </Fragment>
    );
  }
}

export default Header;
