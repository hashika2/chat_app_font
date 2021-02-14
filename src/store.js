import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducer';
// import setAuthToken from './utils/setAuthToken';

// prevent auth error on first run of subscription
const initialState = { auth: { token: null } };
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

// set up a store subscription listener
// to store the users token in localStorage
let currentState = { ...initialState };

store.subscribe(() => {
  // keep track of the previous and current state to compare changes
  let previousState = currentState;
  currentState = store.getState();
  /**  if the token changes set the value in localStorage and axios headers **/
  if (previousState.auth.data.token.accessToken !== currentState.auth.data.token.accessToken) {
    const currentToken = currentState.auth.data.token.accessToken;
    // setAuthToken(token);
    localStorage.setItem("token",currentToken)
  }
  localStorage.setItem("token",previousState.auth.data.token.accessToken)
});

export default store;
