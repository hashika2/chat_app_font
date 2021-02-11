import React from 'react';
import store from './store';
import {Provider} from 'react-redux'
import PrivateRoute from './PrivateRoute';

import Chat from './components/Chat/Chat';
import Join from './components/Join/Join';

import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from './auth/Register';
import Login from './auth/Login';
import PrivateChat from './components/Chat/PrivateChat/PrivateChat';
import Alert from './components/Layout/Alert';

const App = () => {
  return (
    <Provider store={store}>     
      <Router>        
        <Route path="/" exact component={Login} />
        <Alert/>
        <Route path="/register" exact component={Register} />
        <PrivateRoute path="/join" exact component={Join} />
        <Route path="/chat" exact component={Chat} />
        <Route path="/privateChat" exact component={PrivateChat} />
       
      </Router> 
    </Provider>
    
  );
}

export default App;
