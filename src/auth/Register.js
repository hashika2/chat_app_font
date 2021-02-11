import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../action/alert';
import { register } from '../action/index';
import PropTypes from 'prop-types';

const Register = ({ register, isAuthenticated ,setAlert}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
    // if (password !== password2) {
    //   setAlert('Passwords do not match', 'danger');
    //   console.log("doesn't macth")
    // } else {
    //   
    // }
    register({ name, email, password });
  };
  if (isAuthenticated) {
    console.log(isAuthenticated)
    return <Redirect to='/join' />;
  }

  return (
    <Fragment>
      <div className="container" style={{backgroundColor:"black"}}>
      <div className="card" style={{marginTop:"20%"}}>
      <form className='text-center border border-light p-5' onSubmit={e => onSubmit(e)}>
      <p class="h4 mb-4">Sign Up</p>
        <div className='form-group'>
          <input
            className="form-control"
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            className="form-control"
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            className="form-control"
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        {/* <div className='form-group'>
          <input
            className="form-control"
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={e => onChange(e)}
          />
        </div> */}
        <input type='submit' className='btn btn-success' value='Register' />
      </form>
      <p className='text-center'>
        Already have an account? <Link to='/'>Sign In</Link>
      </p>
      </div>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  //setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { register,setAlert }
)(Register);
