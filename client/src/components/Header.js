import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Image } from 'semantic-ui-react';

import logo from '../images/harmoney-logo.svg';

class Header extends Component {
  renderNavLinks = () => {
    if (this.props.authenticated) {
      return (
        <div className="header__links">
          <Link to="/dashboard" className="header__link">
            Dashboard
          </Link>
          <Link to="/user/logout" className="header__link">
            Logout
          </Link>
        </div>
      );
    } else {
      return (
        <div className="header__links">
          <Link to="/user/register" className="header__link">
            Register
          </Link>
          <Link to="/user/login" className="header__link">
            Login
          </Link>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="header">
        <Link to="/">
          <div className="header__logo">
            <Image src={logo} className="header__logo-image" />
            <span className="header__logo-text">Harmoney</span>
          </div>
        </Link>
        {this.renderNavLinks()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated
  };
};

export default connect(mapStateToProps)(Header);
