import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PageNotFound from './section-views/PageNotFound';
import Korea_info from './section-views/Korea_info';
import Info_by_city from './section-views/Info_by_city';
import Home from './section-views/Home';
import Login from './section-views/Login';
import Signup from './section-views/Signup';

const Section = () => {
  return (
    <div className="section">
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/korea_info" component={Korea_info}></Route>
        <Route exact path="/info_by_city" component={Info_by_city}></Route>
        <Route exact path="/board">
          board
        </Route>
        <Route exact path="/post">
          post
        </Route>
        <Route exact path="/profile">
          profile
        </Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/signup" component={Signup}></Route>
        <Route component={PageNotFound}></Route>
      </Switch>
    </div>
  );
};

export default Section;
