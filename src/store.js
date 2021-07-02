import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducer";
// import setAuthToken from './utils/setAuthToken';

// prevent auth error on first run of subscription
const initialState = { auth: { token: null } };
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

// set up a store subscription listener
// to store the users token in localStorage
let currentState = { ...initialState };

store.subscribe(() => {
  // keep track of the previous and current state to compare changes
  let previousState = currentState;
  currentState = store.getState();
  console.log(currentState)
  /**  if the token changes set the value in localStorage and axios headers **/
  if (previousState.auth.token !== currentState.auth.token) {
    const currentToken = currentState.auth.token;
    localStorage.setItem("token", currentToken);
    // setAuthToken(token);
  }
  localStorage.setItem("token", currentState.auth.token);
  // localStorage.setItem("token",previousState.auth.token.user)
});

export default store;
