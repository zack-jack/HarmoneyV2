import React from 'react';

import Login from './Login';

const LoginPage = () => {
  return (
    <div className="login page">
      <div className="login__container">
        <h2 className="login__heading">Login</h2>
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
