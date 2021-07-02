import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import LoadingMask from "react-loadingmask";
import "react-loadingmask/dist/react-loadingmask.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import environment from "../components/environment/env.json";
import { login, googleSignIn } from "../action/index";
import ErroShowing from "../shared/Error";
import axios from "axios";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [iserror, setError] = useState(false);
  const [alertMessage, setAlertMessage] = useState();
  const [loading, setLoading] = useState(false);

  const { email, password } = formData;
  let error = "";
  const history = useHistory();
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const body = {
        email: email,
      };
      const config = {
        headers: {
          "Content-Type": environment.Content_Type,
          "x-browser": environment.x_browser,
          "x-device": environment.x_device,
        },
      };
      const res = await axios.post(
        `${environment.baseUrl}/user/reset`,
        body,
        config
      );
    } catch (err) {}
  };

  useEffect(() => {
    // setAlert(alert);
  }, []);

  return (
    <Fragment>
      <LoadingMask loading={loading} text={"loading..."}>
        <div className="container" style={{ backgroundColor: "black" }}>
          <div className="card" style={{ marginTop: "20%" }}>
            <ErroShowing isError={alertMessage} iserror={iserror} />
            <form
              className="text-center border border-light p-5"
              onSubmit={(e) => onSubmit(e)}
            >
              <p className="h4 mb-4">Reset Password</p>
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
              <input type="submit" className="btn btn-success" value="Resend" />
            </form>
            <p className="text-center">
              Don't have an account? <Link to="/">Sign In</Link>
            </p>
          </div>
        </div>
      </LoadingMask>
    </Fragment>
  );
};

ResetPassword.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  data: state.auth.data,
  alert: state.alert.alert_data,
});

export default connect(mapStateToProps, { login, googleSignIn })(ResetPassword);
