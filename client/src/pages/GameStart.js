import React,{ useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';
import '../css/gamestart.css';


function GameStart({loginClick}) {
  
  const url = new URL(window.location.href);
  const authorizationCode = url.searchParams.get('code'); 
  const [isHover, setIsHover] = useState(false);

  useEffect(async ()=>{
    if(authorizationCode){
      const res= await axios.post('https://api.codestory.academy/oauth',
        { authorizationCode: authorizationCode}, {
          'content-type': 'application/json',
          withCredentials: true
        });
      if(res.data.message==='ok'){
        loginClick();
      }
    }
  },[]);
  

  

  const onMouseOver = () => {
    setIsHover(true);
  };

  const onMouseOut = () => {
    setIsHover(false);
  };

  return (
    <>
      <div id="gamestart-container">
        <Link to="/game">
          <div className="gamestart-btn" 
            onMouseOver={()=>onMouseOver()}
            onMouseOut={()=>onMouseOut()}>
            {
              isHover ? 
                <object id="gamestart-cli-img-hover" type="image/svg+xml" data="cli_icon_hover.svg" aria-label="cli hover icon"></object>
                : <object id="gamestart-cli-img" type="image/svg+xml" data="cli_icon.svg" aria-label="cli icon"></object>
            }
            <span className="gamestart-btn-word">GUI로 배우는 <br />  리눅스 CLI</span>
          </div>
        </Link>
        <div className="gamestart-btn">
          <span className="gamestart-btn-word2">그리면서 배우는 <br /> 모던 CSS</span> <span className="hidden">오픈예정</span>
        </div>
        <div className="gamestart-btn">
          <span className="gamestart-btn-word2">보면서 확인하는 <br /> ES6+ JS <br /></span><span className="hidden">오픈예정</span>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default GameStart;
