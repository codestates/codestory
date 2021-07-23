import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
    <div id="gamestart-container">
      <div id="game-btn">
        <Link to="/game">게임시작</Link>
      </div>
    </div>
  );
}

export default GameStart;