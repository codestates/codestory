import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/signup.css';

function SignUp( onLoginClick ) {

  const [currentId, setCurrentId] = useState({ value: '', valid: false });
  const [currentPassword, setCurrentPassword] = useState({ value: '', valid: false });
  const [currentPassword2, setCurrentPassword2] = useState({ value: '', valid: false });
  const [validUser, setvalidUser] = useState({ id: '', password: '' });

  const inputId = (e) => {
    const input = e.target.value;
    if (input.length > 2) {
      setCurrentId({...currentId, value: input, valid: true});
    } else {
      setCurrentId({...currentId, value: input, valid: false});
    }
  };

  const inputPassword = (e) => {
    const input = e.target.value;
    if (input.length > 7) {
      setCurrentPassword({...currentPassword, value: input, valid: true});
    } else {
      setCurrentPassword({...currentPassword, value: input, valid: false});
    }
  };

  const inputPassword2 = (e) => {
    const input = e.target.value;
    if (input.length > 7 && currentPassword.value === input) {
      setCurrentPassword2({...currentPassword2, value: input, valid: true});
    } else {
      setCurrentPassword2({...currentPassword2, value: input, valid: false});
    }
  };
 
  const userValidator = () => {
    if (currentId && currentPassword) {
      setvalidUser({...validUser, id: currentId.value, password: currentPassword.value });
      // axios.post()
      console.log(validUser);
    }
  };

  return (
    <div id="signup-background">
      <object id="signup-logo" type="image/svg+xml" data="logo.svg" aria-label="logo"></object>
      <div id="signup-container">
        <div id="signup-wrapper">
          <input id="signup-input-id" value={currentId.value} placeholder="아이디 (3자리 이상)" onChange={(e)=>inputId(e)}></input>
          { currentId.valid ? <div id="signup-valid">사용할 수 있는 아이디입니다</div> : <div id="signup-invalid">아이디를 확인해 주세요</div>}
          <input id="signup-input-password" type='password' value={currentPassword.value} placeholder="비밀번호 (8자리 이상)" onChange={(e)=>inputPassword(e)}></input>
          { currentPassword.valid ? <div id="signup-valid">비밀번호가 유효합니다</div> : <div id="signup-invalid">비밀번호를 확인해 주세요</div>}
          <input id="signup-input-password" type='password' value={currentPassword2.value} placeholder="비밀번호 확인" onChange={(e)=>inputPassword2(e)}></input>
          { currentPassword2.valid ? <div id="signup-valid">비밀번호가 유효합니다</div> : <div id="signup-invalid">비밀번호를 확인해 주세요</div>}
          <button id="signup-btn" onClick={()=>userValidator()}>
            <Link to="/gamestart">
              회원가입
            </Link>
          </button>
          <a id="signup-signin" style={{ cursor: 'pointer' }} onClick={()=>onLoginClick.props()}>이미 아이디가 있으신가요?</a>
        </div>  
      </div>
    </div>
  );
}

export default SignUp;