import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import LoadingMask from "react-loadingmask";
import "react-loadingmask/dist/react-loadingmask.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import environment from "../components/environment/env.json";
import { login, googleSignIn } from "../action/index";
import GoogleLogin from "react-google-login";
import ErroShowing from "../shared/Error";
import axios from 'axios';
import queryString from "query-string";

const ConfirmPassword = ({
  location
}) => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const { token,id } = queryString.parse(location.search);
  const [iserror, setError] = useState(false);
  const [alertMessage, setAlertMessage] = useState();
  const [loading, setLoading] = useState(false);

  const { newPassword, confirmPassword } = formData;
  let error = "";
  const history = useHistory();
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const body = {
        password: newPassword,
        userId:id,
        token:token
      };
      const config = {
        headers: {
          "Content-Type": environment.Content_Type,
          "x-browser": environment.x_browser,
          "x-device": environment.x_device,
        },
      };
      const res = await axios.post(
        `${environment.baseUrl}/user/confirm`,
        body,
        config
      );
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
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
              <p className="h4 mb-4">Confirm Password</p>
              <div className="form-group">
                <TextField
                  id="filled-basic"
                  label="new Password"
                  className="form-control"
                  type="password"
                  placeholder="new Password"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="form-group">
                <TextField
                  id="outlined-password-input"
                  label="confirm Password"
                  className="form-control"
                  type="password"
                  placeholder="confirm Password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <input type="submit" className="btn btn-success" value="Submit" />
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

ConfirmPassword.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  data: state.auth.data,
  alert: state.alert.alert_data,
});

export default connect(mapStateToProps, { login, googleSignIn })(
  ConfirmPassword
);
