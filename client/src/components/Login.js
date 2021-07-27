import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SignUp from './SignUp';
import '../css/login.css';
import axios from 'axios';

function Login({loginClick}) {

  const kakaoClientId='ce992090812c730f2178949e1baac586';
  const googleClientId='308904347249-t3ilrgtua2unljo0jgfv50iqihm4buja.apps.googleusercontent.com';
  const redirectUri='https://www.codestory.academy/gamestart' ;
  const kakaoLoginUrl = `https://Kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${redirectUri}&response_type=code`;
  const googleLoginUrl=`https://accounts.google.com/o/oauth2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile`;
  const serverUrl='https://api.codestory.academy';

  const kakaoLoginHandler= async ()=>{
    window.location.assign(`${kakaoLoginUrl}`);
  };

  const googleLoginHandler= async ()=>{
    window.location.assign(`${googleLoginUrl}`);
  };
  
  const [isSignup, setIsSignup] = useState(false);

  const [isHover, setIsHover] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [loginInfo, setLoginInfo] = useState({
    username: '',
    password: ''
  });

  const history = useHistory();
  
  const inputValueHandler = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
    if (loginInfo.username !== '' && loginInfo.password !== '') {
      setErrorMessage('');
    }
  };
  
  const { username, password } = loginInfo;


  const loginHandler = async () => {
    if (username === '' || password === '') {
      setErrorMessage('아이디와 비밀번호 모두 입력해주세요');
    } else {
      await axios.post(serverUrl+'/signin', {
        username: username,
        password: password
      }, {
        'content-type': 'application/json',
        withCredentials: true
      }).then(() => {
        loginClick();
        history.push('/gamestart');
      }).catch(() => {
        setErrorMessage('회원정보가 존재하지 않습니다');
      });
    }
  };

  const signupHandler = () => {
    setIsSignup(!isSignup);
  };

  const onMouseOver = () => {
    setIsHover(true);
  };

  const onMouseOut = () => {
    setIsHover(false);
  };

  return (
    <>
      { isSignup ? (
        <SignUp signupHandler={signupHandler} loginClick={loginClick}/>
      ) : (
        <div id="login-background">
          <object id="login-logo" type="image/svg+xml" data="logo.svg" aria-label="logo"></object>
          <div id="login-container">
            <div id="login-wrapper">
              <input id="login-input-id" placeholder="아이디" onChange={inputValueHandler('username')}></input>
              <p id="login-valid">아이디를 입력해 주세요</p>
              <input id="login-input-password" placeholder="비밀번호" onChange={inputValueHandler('password')}></input>
              <p id="login-valid">비밀번호를 입력해 주세요</p>
              <button id="login-btn" onClick={loginHandler}>
                  로그인
              </button>
              {
                errorMessage === '' ? null :
                  <div className="warn-box">{errorMessage}
                  </div>
              }
              <div id="login-social">
                <a className="login-social-btn" onClick={googleLoginHandler}>
                  <img className="login-social-image" src="login-google.png" alt="google"/>
                </a>
                <a className="login-social-btn"  onClick={kakaoLoginHandler}>
                  <img className="login-social-image" src="login-kakao.png" alt="kakao"/>
                </a>
              </div>

              <a id="login-signin" 
                onMouseOver={()=>onMouseOver()}
                onMouseOut={()=>onMouseOut()}
                onClick={signupHandler}>
                {isHover ? '회원가입 하러가기' : '아직 아이디가 없으신가요?'}
              </a>

            </div>  
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
