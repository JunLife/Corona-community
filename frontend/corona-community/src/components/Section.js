import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PageNotFound from './section-views/PageNotFound';
import KoreaInfo from './section-views/KoreaInfo';
import CityInfo from './section-views/CityInfo';
import Home from './section-views/Home';
import Login from './section-views/Login';
import Signup from './section-views/Signup';
import Profile from './section-views/Profile';
import Board from './section-views/Board';
import BoardDetail from './section-views/BoardDetail';
import NewPost from './section-views/NewPost';
import MyPosts from './section-views/MyPosts';
import ModifyPost from './section-views/ModifyPost';

const Section = () => {
  return (
    <div className="section">
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/korea_info" component={KoreaInfo}></Route>
        <Route exact path="/info_by_city" component={CityInfo}></Route>
        <Route exact path="/board" component={Board}></Route>
        <Route exact path="/post/new" component={NewPost}></Route>
        <Route exact path="/profile" component={Profile}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/signup" component={Signup}></Route>
        <Route exact path="/board/detail/:id" component={BoardDetail}></Route>
        <Route exact path="/my_posts" component={MyPosts}></Route>
        <Route exact path="/modify_post/:id" component={ModifyPost}></Route>
        <Route component={PageNotFound}></Route>
      </Switch>
    </div>
  );
};

export default Section;
