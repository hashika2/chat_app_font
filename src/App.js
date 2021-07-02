import React from "react";
import store from "./store";
import { persistStore, persistReducer } from "redux-persist";
import { Provider } from "react-redux";
import PrivateRoute from "./PrivateRoute";
import Chat from "./components/Chat/Chat";
import Join from "./components/Join/Join";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import Register from "./auth/Register";
import Login from "./auth/Login";
import PrivateChat from "./components/Chat/PrivateChat/PrivateChat";
import Alert from "./components/Layout/Alert";
import Profile from "./components/profile/Profile";
import ResetPassword from "./auth/ResetPassword";
import ConfirmPassword from "./auth/ConfirmPassword";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/" exact component={Login} />
        <Alert />
        <Route path="/register" exact component={Register} />
        {/* <PersistGate loading={null} persistor={persistStore(store)}> */}
        <Route path="/join" exact component={Join} />
        {/* </PersistGate> */}
        <Route path="/chat" exact component={Chat} />
        <Route path="/privateChat" exact component={PrivateChat} />
        <Route path="/resetPassword" exact component={ResetPassword} />
        <Route path="/confirmPassword" exact component={ConfirmPassword} />
        <Route path="/profile" exact component= {Profile}/>
      </Router>
    </Provider>
  );
};

export default App;
