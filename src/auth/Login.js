import React, { Fragment, useState, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import environment from "../components/environment/env.json";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login, googleSignIn } from "../action/index";
import TextField from "@material-ui/core/TextField";
import GoogleLogin from "react-google-login";
import ErroShowing from "../shared/Error";

const Login = ({ login, googleSignIn, isAuthenticated, alert, data }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const [iserror, setError] = useState(false);
  const [alertMessage,setAlertMessage] = useState()
  let error = "";
  const history = useHistory();
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });
    setTimeout(() => {
      setError(false);
    }, 10000);
  };

  const setAlert = (alert) => {
    if (alert.alertType === "danger") {
      error = alert.msg;
      setError(true);
      setAlertMessage(alert.msg)
    }
  };

  useEffect(() => {
    setAlert(alert);
  });

  if (isAuthenticated) {
    // return <Redirect to={`/join?email=${email}`} />;
    history.push(`/join?email=${email}`);
  }

  const responseGoogle = async (response) => {
    //   var res = response.profileObj;
    //   localStorage.setItem('email',res.email)
    //   setFormData({...formData,[email]:res.email})
    //   googleSignIn(await response.accessToken);
    //   history.push(`/join?email=${res.email}`);
  };

  return (
    <Fragment>
      <div className="container" style={{ backgroundColor: "black" }}>
        <div className="card" style={{ marginTop: "20%" }}>
          {iserror?<ErroShowing isError={alertMessage} iserror={iserror} />:null}
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
