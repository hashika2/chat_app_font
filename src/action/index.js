import axios from "axios";
import { setAlert } from "./alert";
import environment from "../components/environment/env.json";

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
    type: "ROOMED",
    payload: res,
  });
};

export const register = ({ name, email, password }) => async (dispatch) => {
  const body = {
    name,
    email,
    password,
  };
  try {
    const res = await axios.post(`${environment.baseUrl}/user`, body, config);

    dispatch({
      type: "USER_REGISTERED",
      payload: res.data,
    });
    alertData(res.data);
  } catch (error) {
    if (error) {
      console.log("error " + error);
      dispatch(setAlert(error, "danger"));
    }
    dispatch({
      type: "REGISTER_FAIL",
    });
  }
};

const alertData = (data) => async (dispatch) => {
  dispatch({
    type: "ALERTMESSAGE",
    payload: data,
  });
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
    dispatch({
      type: "USER_LOGGED",
      payload: res.data,
    });
  } catch (error) {
    if (error) {
      console.log("error   " + error);
      // error.map(error => { dispatch(setAlert(error,'danger'))});
      dispatch(setAlert(error, "danger"));
    }
    dispatch({
      type: "LOGIN_FAIL",
    });
  }
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
