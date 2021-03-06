import React, { useEffect, useState } from 'react';
import WOW from 'wowjs';
import Login from '../components/Login';
import '../css/landing.css';

function Landing({loginClick, setIsLogin}) {

  const [isVisible, setIsVisible] = useState(false);
  const [y, setY] = useState(null);

  useEffect(() => {
    setIsLogin(false);
  });

  useEffect(() => {
    window.addEventListener('scroll', (e) => handleNavigation(e));
    return () => { 
      window.removeEventListener('scroll', (e) => handleNavigation(e));
    };
  }, [y]);
  
  useEffect(() => {
    new WOW.WOW({ live: false }).init();
  }, []);
  
  const handleNavigation = (e) => {
    const window = e.currentTarget.scrollY;
    if (window >= 650 && window < 2000) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
    setY(window.scrollY);
  };

  const scrollToBottom = () => {
    document.getElementById('root').scrollIntoView({ behavior: 'smooth', block: 'end' });
  };
  
  const move1 = () => {
    window.scrollTo({
      top: document.getElementById('landing-page-2').offsetHeight,
      behavior: 'smooth'
    });
  };
  
  const move2 = () => {
    window.scrollTo({
      top: (document.getElementById('landing-page-3').offsetHeight) * 2,
      behavior: 'smooth'
    });
  };
  
  const move3 = () => {
    window.scrollTo({
      top: document.getElementById('landing-page-4').offsetHeight * 3,
      behavior: 'smooth'
    });
  };
  
  const fadeIn = {
    opacity: 1,
    transition: '.5s'
  };

  const fadeOut = {
    opacity: 0,
    transition: '.5s'
  };

  return (
    <div id="landing-container">
      <div id="landing-page-1">
        <div id="landing-logo-box" onClick={move1}>
          <object id="landing-logo" className="wow pulse animate__slower" type="image/svg+xml" data="logo.svg" aria-label="logo"></object>
        </div>
      </div>
      <div id="landing-page-2">
        <div id="landing-word" className="wow pulse" onClick={move2}>아직도 코딩을 공부하고 계신가요?</div>
        <button
          className='landing-btn'
          style={isVisible
            ? fadeIn
            : fadeOut}
          onClick={() => scrollToBottom()}
        >
          로그인 하러가기
          <span className="material-icons" id="landing-btn-arrow">expand_more</span>
        </button>
      </div>
      <div id="landing-page-3">
        <div id="landing-word" className="wow pulse" onClick={move3}>혹시 코딩 공부를 더 재미있게 하고 싶진 않으신가요?</div>
      </div>
      <div id="landing-page-4">
        <div id="landing-word" className="wow pulse" onClick={scrollToBottom}>스토리로 배우는 코딩! CodeStory와 함께하세요</div>
      </div>
      <div id="landing-page-5">
        <Login loginClick={loginClick}/>
      </div>
    </div>
  );
}

export default Landing;
