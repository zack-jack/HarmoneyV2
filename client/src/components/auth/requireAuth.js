import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

export default ChildComponent => {
  class ComposedComponent extends Component {
    componentDidMount() {
      this.authFailedRedirect();
    }

    componentDidUpdate() {
      this.authFailedRedirect();
    }

    authFailedRedirect = () => {
      if (!this.props.auth) {
        this.props.history.push('/');
      }
    };

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => {
    return { auth: state.auth.authenticated };
  };

  return compose(
    connect(mapStateToProps),
    withRouter
  )(ComposedComponent);
};
