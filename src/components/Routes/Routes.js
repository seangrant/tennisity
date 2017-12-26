import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../Home/Home';
import Login from '../User/Login/Login';
import Signup from '../User/Signup/Signup';
import Ladder from '../Ladder/Ladder';
import Schedule from '../Schedule/Schedule';
import AddTeam from '../Team/AddTeam/AddTeam';

export default () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/login" exact component={Login} />
    <Route path="/signup" exact component={Signup} />
    <Route path="/category/:category/teams/add" exact component={AddTeam} />
    <Route path="/team/add" exact component={AddTeam} />
    <Route path="/team/:id/schedule" exact component={Schedule} />
    <Route
      path="/ladder/category/:category/ranking/:ranking"
      exact
      component={Ladder}
    />
  </Switch>
);
