import axios from "axios";
import { API, Bearer, config } from "../shared/constant";
import LOGGED_USER from "./types";

export const getUserProfile = () => async (dispatch) => {
  try {
    const authToken = localStorage.getItem('token');
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${Bearer} ${authToken}`,
      },
    };
    const res = await axios.get(`http://localhost:5000/api/user/getUser`, config);
    dispatch({
      type: 'LOGGED_USER',
      payload: res.data,
    });
  } catch (error) {
    if (error) {
      console.log("error " + error);
      // dispatch(setAlert(error,'danger'))
    }
    dispatch({
      type: "REGISTER_FAIL",
    });
  }
};
