import React from 'react';

function Login() {
  return (
    <div id="login-background">
      <object id="login-logo" type="image/svg+xml" data="logo.svg" aria-label="logo"></object>
      <div id="login-container">
        <div id="login-wrapper">
          <input id="login-input-id" placeholder="아이디"></input>
          <p id="login-valid">아이디를 입력해 주세요</p>
          <input id="login-input-password" placeholder="비밀번호"></input>
          <p id="login-valid">비밀번호를 입력해 주세요</p>
          <button id="login-btn">로그인</button>
            <div id="login-social">
              <a className="login-social-btn" href="">
                <img className="login-social-image" src="login-google.png" alt="google"/>
              </a>
              <a className="login-social-btn" href="">
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