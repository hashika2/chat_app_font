import { combineReducers } from "redux";
import auth from "./auth";
import alert from "./alert";
import postMessage from "./postMessage";
import getRoomData from "./getRoomData";
import getUser from "./getUser";

export default combineReducers({
  auth: auth,
  alert: alert,
  postMessage: postMessage,
  getRoomData: getRoomData,
  getUser: getUser,
});
