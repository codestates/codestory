import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';
import '../css/gamestart.css';

function GameStart({oauthLocation,loginClick,newOauthToken}) {

  const url = new URL(window.location.href);
  const authorizationCode = url.searchParams.get('code');
  useEffect(async ()=>{
    if(authorizationCode){
      let res = await axios.post('http://localhost:4000/oauth', { authorizationCode: authorizationCode,location:oauthLocation});
      loginClick();
      newOauthToken(res.data.oauthAccessToken);
    }
  });

  return (
    <>
      <div id="gamestart-container">
        <Link to="/game">
          <div className="gamestart-btn">
            <span className="gamestart-btn-word">GUI로 배우는 <br />  리눅스 CLI</span>
          </div>
        </Link>
        <div className="gamestart-btn">
          <span className="gamestart-btn-word">그리면서 배우는 <br /> 모던 CSS</span> <span className="hidden">(오픈예정)</span>
        </div>
        <div className="gamestart-btn">
          <span className="gamestart-btn-word">보면서 확인하는 <br /> ES6+ JS <br /></span><spna className="hidden">(오픈예정)</spna>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default GameStart;