import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PageNotFound from './section-views/PageNotFound';
import KoreaInfo from './section-views/KoreaInfo';
import CityInfo from './section-views/CityInfo';
import Home from './section-views/Home';
import Login from './section-views/Login';
import Signup from './section-views/Signup';
import Post from './section-views/Post';
import Profile from './section-views/Profile';

const Section = () => {
  return (
    <div className="section">
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/korea_info" component={KoreaInfo}></Route>
        <Route exact path="/info_by_city" component={CityInfo}></Route>
        <Route exact path="/board">
          board
        </Route>
        <Route exact path="/post" component={Post}></Route>
        <Route exact path="/profile" component={Profile}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/signup" component={Signup}></Route>
        <Route component={PageNotFound}></Route>
      </Switch>
    </div>
  );
};

export default Section;
