import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div id="nav-container">
      <span id="title">
        {/* <span id="name">Code Story</span> */}
      </span>
      <div id="menu">
        <div className="btn">
          <Link to="/gamestart">게임</Link>
        </div>
        <div className="btn">
          <Link to="/ranking">랭킹</Link>
        </div>
        <div className="btn">
          <Link to="/profile">프로필</Link>
        </div>
      </div>
    </div>
  );
}

export default Nav;