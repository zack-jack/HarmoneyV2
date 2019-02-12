import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Image } from 'semantic-ui-react';

import Register from './auth/Register';
import welcome from '../images/welcome-graphics.png';

const Welcome = props => {
  return (
    <div className="welcome">
      <div className="welcome__container">
        <Grid centered>
          <Grid.Row columns={2}>
            <Grid.Column centered textAlign="center" className="welcome__intro">
              <h1 className="welcome__heading">Harmoney</h1>
              <p className="welcome__heading-text">
                Find perfect harmony with your money with our free personal
                finance app.
              </p>
              <Image centered size="medium" src={welcome} />
            </Grid.Column>

            <Grid.Column>
              {props.auth.authenticated ? null : (
                <>
                  <h2 className="welcome__signup-heading">
                    Sign up and get started today.
                  </h2>
                  <Register />

                  <div className="register__login">
                    <p>Already have an account with us?</p>
                    <Link to="/user/login" className="register__login-link">
                      Login
                    </Link>
                  </div>
                </>
              )}
            </Grid.Column>
          </Grid.Row>
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
