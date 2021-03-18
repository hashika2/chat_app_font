import React, { Fragment, useState, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import environment from "../components/environment/env.json";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login, googleSignIn } from "../action/index";
import IdleTimeOut from "../components/timeoutSession/IdleTimeOut";
import TextField from "@material-ui/core/TextField";
import GoogleLogin from "react-google-login";

const Login = ({ login, googleSignIn, isAuthenticated, alert, data }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const [iserror, setError] = useState(false);
  let error = "";
  let msgColor = "";
  const history = useHistory();
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login({ email, password });
  };

  useEffect(() => {
    setTimeout(() => {
      setError(false);
    }, 5000);
  });

  if (isAuthenticated) {
    // return <Redirect to={`/join?email=${email}`} />;
    history.push(`/join?email=${email}`);
  }
  if (alert.alertType === "danger") {
    error = alert.msg;
    setError(true);
    console.log(error);
  }

  const ErroShowing = ({ isError, is }) => {
    if (isError) {
      return (
        <p
          style={{
            backgroundColor: "red",
            textAlign: "center",
            color: "white",
          }}
        >
          {isError}
        </p>
      );
    }
    return <p></p>;
  };

  const responseGoogle = async (response) => {
    //   var res = response.profileObj;
    //   localStorage.setItem('email',res.email)
    //   setFormData({...formData,[email]:res.email})
    //   googleSignIn(await response.accessToken);
    //   history.push(`/join?email=${res.email}`);
  };

  return (
    <Fragment>
      {/* <IdleTimeOut/> */}
      <div className="container" style={{ backgroundColor: "black" }}>
        <div className="card" style={{ marginTop: "20%" }}>
          <ErroShowing isError={iserror} />
          <form
            className="text-center border border-light p-5"
            onSubmit={(e) => onSubmit(e)}
          >
            <p className="h4 mb-4">Sign In</p>
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
            <input type="submit" className="btn btn-success" value="Login" />
            <div className="row">
              <div className="col-sm-12">
                <div className="col-sm-4"></div>
                <div className="col-sm-6">
                  <br></br>
                  <GoogleLogin
                    clientId={environment.clientId}
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

export default connect(mapStateToProps, { login, googleSignIn })(Login);
