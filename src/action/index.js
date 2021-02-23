import axios from "axios";
import { setAlert } from "./alert";
import environment from "../components/environment/env.json";
import ROOMED from "./types";
import USER_REGISTERED from "./types";
import REGISTER_FAIL from "./types";

const config = {
  headers: {
    "Content-Type": environment.Content_Type,
    "x-browser": environment.x_browser,
    "x-device": environment.x_device,
  },
};

export const roommed = ({ name, room }) => async (dispatch) => {
  const res = {
    name: name,
    room: room,
  };
  dispatch({
    type: ROOMED,
    payload: res,
  });
};

export const register = ({ name, email, password }) => async (dispatch) => {
  const body = {
    username: name,
    email,
    password,
  };
  try {
    const res = await axios.post(`${environment.baseUrl}/user`, body, config);

    dispatch({
      type: USER_REGISTERED,
      payload: res.data,
    });
    alertData(res.data);
  } catch (error) {
    if (error) {
      console.log("error " + error);
      dispatch(setAlert(error, "danger"));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const login = ({ email, password }) => async (dispatch) => {
  const body = {
    email,
    password,
  };
  try {
    const res = await axios.post(
      `${environment.baseUrl}/user/login`,
      body,
      config
    );
    // localStorage.setItem("token", res.data.token.accessToken);
    localStorage.setItem("email", res.data.token.user);

    dispatch({
      type: "USER_LOGGED",
      payload: res.data,
    });
  } catch (error) {
    if (error) {
      console.log("error  " + error);
      // error.map(error => { dispatch(setAlert(error,'danger'))});
      dispatch(setAlert(error, "danger"));
    }
    dispatch({
      type: "LOGIN_FAIL",
    });
  }
};

export const googleSignIn = (response) => async (dispatch) => {
  try {
    localStorage.setItem('token',response)
    dispatch({
      type: "GOOGLE_SIGNIN",
      data: response,
    });
  } catch (error) {
    dispatch(setAlert(error, "danger"));
  }
};

const alertData = (data) => async (dispatch) => {
  dispatch({
    type: "ALERTMESSAGE",
    payload: data,
  });
};

export const getRoomData = (room) => async (dispatch) => {
  const body = { room };
  const res = await axios.get(
    `${environment.baseUrl}/user/roomData`,
    body,
    config
  );
  dispatch({
    type: "GET_ROOM_DATA",
    payload: res.data,
  });
};
