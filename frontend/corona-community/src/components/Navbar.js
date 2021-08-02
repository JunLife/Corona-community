import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar">
      <ul className="menu">
        <Link to="/" className="link">
          <li className="homeItem item">
            <img src="/logo.png" alt="logo" className="homeIcon"></img>
            Corona19 Comunity
          </li>
        </Link>
        <Link to="/korea_info" className="link">
          <li className={'menu-item item'}>
            <i className="fas fa-flag" style={{ marginRight: '5%' }}></i>국내
            확진
          </li>
        </Link>
        <Link to="/info_by_city" className="link">
          <li className="menu-item item">
            <i className="fas fa-city" style={{ marginRight: '5%' }}></i>시도별
            확진
          </li>
        </Link>
        <Link to="/board" className="link">
          <li className="menu-item item">
            <i className="fas fa-list" style={{ marginRight: '5%' }}></i>게시물
          </li>
        </Link>
        <Link to="/post/new" className="link">
          <li className="menu-item item">
            <i className="fas fa-pen" style={{ marginRight: '5%' }}></i>글쓰기
          </li>
        </Link>
        <Link to="/profile" className="link">
          <li className="menu-item item">
            <i className="fas fa-id-card" style={{ marginRight: '5%' }}></i>
            프로필
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
