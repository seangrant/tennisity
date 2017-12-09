import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../Home/Home';
import Login from '../User/Login/Login';
import Signup from '../User/Signup/Signup';
import Ladder from '../Ladder/Ladder';

export default () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/login" exact component={Login} />
    <Route path="/signup" exact component={Signup} />
    <Route path="/ladder/:category/:ranking" exact component={Ladder} />
  </Switch>
);
