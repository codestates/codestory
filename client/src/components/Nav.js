import React from 'react';
import { Link } from 'react-router-dom';

function Nav( isLogin ) {
  const scrollToBottom = () => {
    document.getElementById('root').scrollIntoView({ block: 'end' });
  };

  return (
    <div id="nav-container">
      <span id="title">
        {/* <span id="name">Code Story</span> */}
      </span>
      <div id="menu">
        { isLogin.props ? (
          <div className="btn">
            <Link to="/gamestart">게임</Link>
          </div>
        ) : (
          null
        )}
        { isLogin.props ? (
          <div className="btn">
            <Link to="/ranking">랭킹</Link>
          </div>
        ) : (
          null
        )}
        <div className="btn">
          { isLogin.props ? (
            <Link to="/profile">프로필</Link>
          ) : (
            <div onClick={()=>scrollToBottom()}>로그인</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;