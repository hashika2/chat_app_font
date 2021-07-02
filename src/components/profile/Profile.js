import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import axios from "axios";
import environment from "../../components/environment/env.json";
import "./Profile.css";
import { Bearer } from "../../shared/constant";
import GoogleLogin from "react-google-login";
import { getUserProfile } from "../../action/userProfile";
import { connect } from "react-redux";

const Profile = ({ getUserProfile, profile }) => {
  const [user, getUser] = useState();
  const [formData, setFormData] = useState({
    fullName: '',
    email: "",
    phone: "",
    webUrl: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const {
    fullName,
    email,
    phone,
    webUrl,
    street,
    city,
    state,
    zipCode,
  } = formData;

  useEffect(() => {
    getUserProfile();
  }, []);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
  };

  const getUserDetails = async () => {
    try {
      const config = {
        headers: {
          Authorization: `${Bearer} ${
            localStorage.getItem("token") || GoogleLogin.Authorization
          }`,
        },
      };
      const res = await axios.get(
        `${environment.baseUrl}/user/getUser`,
        config
      );
      const resData = res?.data;

      getUser(resData);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <h2 className="text-center">Profile</h2>
      <div className="container">
        <br></br>
        <div className="row gutters">
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body">
                <div className="account-settings">
                  <div className="user-profile">
                    <div className="user-avatar">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar1.png"
                        alt="Maxwell Admin"
                      />
                    </div>
                    <h5 className="user-name">{profile?.user.name}</h5>
                    <h6 className="user-email">{profile?.user.email}</h6>
                  </div>
                  <div className="about">
                    <h5 className="mb-2 text-primary">About</h5>
                    <p>
                      I'm Yuki. Full Stack Designer I enjoy creating
                      user-centric, delightful and human experiences.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
              <div className="card h-100">
                <div className="card-body">
                  <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <h6 className="mb-3 text-primary">Personal Details</h6>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label for="fullName">Full Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="fullName"
                          placeholder="Enter full name"
                          value={fullName}
                          onChange={(e) => onChange(e)}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label for="eMail">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          id="eMail"
                          placeholder="Enter email ID"
                          value={email}
                          onChange={(e) => onChange(e)}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label for="phone">Phone</label>
                        <input
                          type="text"
                          className="form-control"
                          id="phone"
                          placeholder="Enter phone number"
                          value={phone}
                          onChange={(e) => onChange(e)}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label for="website">Website URL</label>
                        <input
                          type="url"
                          className="form-control"
                          id="website"
                          placeholder="Website url"
                          value={webUrl}
                          onChange={(e) => onChange(e)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <h6 className="mb-3 text-primary">Address</h6>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label for="Street">Street</label>
                        <input
                          type="name"
                          className="form-control"
                          id="Street"
                          placeholder="Enter Street"
                          value={street}
                          onChange={(e) => onChange(e)}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label for="ciTy">City</label>
                        <input
                          type="name"
                          className="form-control"
                          id="ciTy"
                          placeholder="Enter City"
                          value={city}
                          onChange={(e) => onChange(e)}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label for="sTate">State</label>
                        <input
                          type="text"
                          className="form-control"
                          id="sTate"
                          placeholder="Enter State"
                          value={state}
                          onChange={(e) => onChange(e)}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label for="zIp">Zip Code</label>
                        <input
                          type="text"
                          className="form-control"
                          id="zIp"
                          placeholder="Zip Code"
                          value={zipCode}
                          onChange={(e) => onChange(e)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className="text-right">
                        <button
                          type="button"
                          id="submit"
                          name="submit"
                          className="btn btn-secondary"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          id="submit"
                          name="submit"
                          className="btn btn-primary"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({ profile: state.getUser.data });

export default connect(mapStateToProps, { getUserProfile })(Profile);
