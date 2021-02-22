import React, { Fragment, useState, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../action/index";
import IdleTimeOut from "../components/timeoutSession/IdleTimeOut";
import TextField from "@material-ui/core/TextField";
import GoogleLogin from "react-google-login";

const Login = ({ login, isAuthenticated, alert, data }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { email, password } = formData;
  let error = "";
  const history = useHistory();
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login({ email, password });
  };

  if (isAuthenticated) {
    // return <Redirect to={`/join?email=${email}`} />;
    history.push(`/join?email=${email}`);
  }
  if (alert.alertType === "danger") {
    error = "Invalid Username and Password";
  }

  const responseGoogle = (response) => {
    console.log(response);
    var res = response.profileObj;
    console.log(res);
    // debugger;
    history.push(`/join?email=${res.email}`);
    // signup(response);
  };

  return (
    <Fragment>
      {/* <IdleTimeOut/> */}
      <div className="container" style={{ backgroundColor: "black" }}>
        <div className="card" style={{ marginTop: "20%" }}>
          <p
            style={{
              backgroundColor: "red",
              textAlign: "center",
              color: "white",
            }}
          >
            {error}
          </p>
          <form
            className="text-center border border-light p-5"
            onSubmit={(e) => onSubmit(e)}
          >
            <p class="h4 mb-4">Sign In</p>
            <div className="form-group">
              <TextField
                id="filled-basic"
                label="Email Address"
                className="form-control"
                type="text"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div>{emailError}</div>
            <div className="form-group">
              <TextField
                id="outlined-password-input"
                label="Password"
                className="form-control"
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div>{passwordError}</div>
            <input type="submit" className="btn btn-success" value="Login" />
            <div className="row">
              <div className="col-sm-12">
                <div className="col-sm-4"></div>
                <div className="col-sm-6">
                  <GoogleLogin
                    clientId="539255563878-la2cnr37vdn5i8gtj3dit6fc41pebr0e.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                  ></GoogleLogin>
                </div>
              </div>
            </div>
          </form>
          <p className="text-center">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  data: state.auth.data,
  alert: state.alert.alert_data,
});

export default connect(mapStateToProps, { login })(Login);
