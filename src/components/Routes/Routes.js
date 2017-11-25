import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../Home/Home';
import Login from '../Login/Login';

export default () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/login" exact component={Login} />
  </Switch>
);
