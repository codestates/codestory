import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';

function Login(loginClick) {
  const [oauthLocation,setOauthLocation]=useState('kakao');
  const kakaoClientId='ce992090812c730f2178949e1baac586';
  const redirectUri='http://localhost:3000/login';
  const kakaoLoginUrl = `https://Kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${redirectUri}&response_type=code`;
  const url = new URL(window.location.href);
  const authorizationCode = url.searchParams.get('code');


  useEffect(()=>{
    console.log(authorizationCode, oauthLocation);
    // const oauthAccessToken=getAccessToken(authorizationCode);
    if(authorizationCode){
      window.location.assign('http://localhost:3000/gamestart');
    }
  });

  function kakaoLoginHandler(){
    setOauthLocation('kakao');
    window.location.assign(kakaoLoginUrl);
  }
  // const getAccessToken = async (authorizationCode)=> {
  //   // let res = await axios.post('http://localhost:4000/oauth', {authorizationCode: authorizationCode, oauthLocation: oauthLocation });
  //   loginClick();
  //   setOauthToken('hi, hello');
  //   window.location.assign('http://localhost:3000/gamestart');
  // };

  return (
    <div id="login-background">
      <object id="login-logo" type="image/svg+xml" data="logo.svg" aria-label="logo"></object>
      <div id="login-container">
        <div id="login-wrapper">
          <input id="login-input-id" placeholder="아이디"></input>
          <p id="login-valid">아이디를 입력해 주세요</p>
          <input id="login-input-password" placeholder="비밀번호"></input>
          <p id="login-valid">비밀번호를 입력해 주세요</p>
          <button id="login-btn">
            <Link to="/gamestart" onClick={()=>loginClick.props()}>로그인</Link>
          </button>
          <div id="login-social">
            <a className="login-social-btn" onClick={kakaoLoginHandler}>
              <img className="login-social-image" src="login-google.png" alt="google"/>
              {authorizationCode}
            </a>
            <a className="login-social-btn" href={kakaoLoginUrl}>
              <img className="login-social-image" src="login-kakao.png" alt="kakao"/>
            </a>
          </div>
          <a id="login-signin" href="">아직 아이디가 없으신가요?</a>
        </div>  
      </div>
    </div>
  );
}

export default Login;