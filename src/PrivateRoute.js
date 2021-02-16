import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
const isAuth = localStorage.getItem('token')

const PrivateRoute = ({
  component: Component,
   isAuthenticated ,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isAuth ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(PrivateRoute);