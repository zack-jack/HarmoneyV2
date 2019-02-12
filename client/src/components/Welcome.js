import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Image } from 'semantic-ui-react';

import Register from './auth/Register';
import piggyBank from '../images/welcome-graphics-piggybank.png';
import moneyBag from '../images/welcome-graphics-moneybag.png';
import thumbsUp from '../images/welcome-graphics-thumbsup.png';

const Welcome = props => {
  return (
    <div className="welcome page">
      <div className="welcome__container">
        <Grid>
          <Grid.Column
            centered
            computer={8}
            largeScreen={6}
            textAlign="center"
            className="welcome__intro"
          >
            <h1 className="welcome__heading">Harmoney</h1>
            <p className="welcome__heading-text">
              Find perfect harmony with your money with our free personal
              finance app.
            </p>
            <div className="welcome__images">
              <Image centered size="tiny" src={piggyBank} />
              <Image centered size="tiny" src={moneyBag} />
              <Image centered size="tiny" src={thumbsUp} />
            </div>
          </Grid.Column>

          <Grid.Column computer={8} largeScreen={7}>
            {props.auth.authenticated ? null : (
              <div className="welcome__register">
                <h2 className="welcome__register-heading">
                  Sign up and get started today.
                </h2>
                <Register />

                <div className="register__login">
                  <p>Already have an account with us?</p>
                  <Link to="/user/login" className="register__login-link">
                    Login
                  </Link>
                </div>
              </div>
            )}
          </Grid.Column>
        </Grid>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Welcome);
