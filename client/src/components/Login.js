import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SignUp from './SignUp';
import '../css/login.css';

function Login({loginClick,newOauthLocation}) {
  const kakaoClientId='ce992090812c730f2178949e1baac586';
  const redirectUri='http://localhost:3000/gamestart';
  const kakaoLoginUrl = `https://Kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${redirectUri}&response_type=code`;
  console.log(newOauthLocation);
  function newLocation(location){
    newOauthLocation(location);
  }
  const kakaoLoginHandler= async ()=>{
    
    await newLocation('hello');
    await window.location.assign(kakaoLoginUrl);
  };
  

  const [isSignup, setIsSignup] = useState(false);

  const onClick = () => {
    setIsSignup(true);
  };

  const onLoginClick = () => {
    setIsSignup(false);
  };

  return (
    <>
      { isSignup ? (
        <SignUp props={onLoginClick}/>
      ) : (
        <div id="login-background">
          <object id="login-logo" type="image/svg+xml" data="logo.svg" aria-label="logo"></object>
          <div id="login-container">
            <div id="login-wrapper">
              <input id="login-input-id" placeholder="아이디"></input>
              <p id="login-valid">아이디를 입력해 주세요</p>
              <input id="login-input-password" placeholder="비밀번호"></input>
              <p id="login-valid">비밀번호를 입력해 주세요</p>
              <button id="login-btn">
                <Link to="/gamestart" onClick={()=>loginClick()}>로그인</Link>
              </button>
              <div id="login-social">
                <a className="login-social-btn" onClick={kakaoLoginHandler}>
                  <img className="login-social-image" src="login-google.png" alt="google"/>
                </a>
                <a className="login-social-btn" href={kakaoLoginUrl}>
                  <img className="login-social-image" src="login-kakao.png" alt="kakao"/>
                </a>
              </div>
              <a id="login-signin" style={{ cursor: 'pointer' }} onClick={()=>onClick()}>아직 아이디가 없으신가요?</a>
            </div>  
          </div>
        </div>
      )}
    </>
  );
}

export default Login;