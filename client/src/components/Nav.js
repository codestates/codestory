import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Nav({ isLogin, userInfo, logoutClick }) {

  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    if (location.pathname === '/gamestart') {
      if (isLogin === false) {
        setIsLoading(true);
      }
      if (isLogin === true) {
        setIsLoading(false);
      }
    }
  }, [isLogin]);

  const scrollToBottom = () => {
    document.getElementById('root').scrollIntoView({ block: 'end' });
  };

  return (
    <div id="nav-container">
      { isLogin
        ? <>
          <span id="title">
            <span id="name">{`반갑습니다 ${userInfo.username}님!`}</span>
          </span>
          <div id="menu">  
            <Link to="/gamestart">
              <div className="btn">게임</div>
            </Link>
            <Link to="/ranking">
              <div className="btn">랭킹</div>
            </Link>
            <Link to="/profile"><div className="btn">프로필</div> 
            </Link>
            <Link to="/" onClick={() => logoutClick()}>
              <div id="btn-login">로그아웃</div> 
            </Link>
          </div>
        </>
        : isLoading
          ? <>
            <span id="title">
              <span id="name">로딩중입니다</span>
              <div id="nav-loading">
                <div className="nav-loading-circle"></div>
                <div className="nav-loading-circle"></div>
                <div className="nav-loading-circle"></div>
              </div>
            </span>
            <div id="menu">  
              <div className="btn-loading"></div>
              <div className="btn-loading"></div>
              <div className="btn-loading"></div>
              <div className="btn-loading"></div>
            </div>
          </>
          : <>
            <span id="title"></span>
            <div id="menu">  
              <div className="btn">
                <div onClick={() => scrollToBottom()}>로그인</div>
              </div> 
            </div>
          </>
      }
    </div> 
  );
}

export default Nav;