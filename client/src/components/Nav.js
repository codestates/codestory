import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Nav({ isLogin, userInfo, logoutClick }) {

  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const scrollToBottom = () => {
    document.getElementById('root').scrollIntoView({ block: 'end' });
  };

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

  return (
    <div id="nav-container">
      { isLogin ? (
        <>
          <span id="title">
            <span id="name">{`반갑습니다 ${userInfo.username}님!`}</span>
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
            <div className="btn">
              <Link to="/" onClick={()=>logoutClick()}>로그아웃</Link>
            </div> 
          </div>
        </>
      ) : (
        isLoading ? 
          <>
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
          : 
          <>
            <span id="title"></span>
            <div id="menu">  
              <div className="btn">
                <div onClick={()=>scrollToBottom()}>로그인</div>
              </div> 
            </div>
          </>
      )}
    </div> 
  );
}

export default Nav;