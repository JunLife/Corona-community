import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const stateList = [true, false, false, false, false];
  const handleSelected = () => {};

  return (
    <div className="navbar">
      <ul className="menu">
        <Link to="/" className="link">
          <li className="homeItem item">
            <img src="/logo.png" className="homeIcon"></img>
            Corona19 Comunity
          </li>
        </Link>
        <Link to="/korea_info" className="link">
          <li className={'menu-item item'}>국내 확진</li>
        </Link>
        <Link to="/info_by_city" className="link">
          <li className="menu-item item">시도별 확진</li>
        </Link>
        <Link to="/board" className="link">
          <li className="menu-item item">게시물</li>
        </Link>
        <Link to="/post" className="link">
          <li className="menu-item item">글쓰기</li>
        </Link>
        <Link to="/profile" className="link">
          <li className="menu-item item">프로필</li>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
