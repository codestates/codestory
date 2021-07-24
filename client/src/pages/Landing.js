import React, { useEffect, useState } from 'react';
import WOW from 'wowjs';
import Login from '../components/Login';
import '../css/landing.css';

function Landing({loginClick}) {
  const [isClick, setIsClick] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [y, setY] = useState(null);

  const handleNavigation = (e) => {
    const window = e.currentTarget.scrollY;
    if (window >= 680 && window < 2200) {
      setIsClick(false);
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
    setY(window.scrollY);
    console.log(window);
  };

  useEffect(() => {
    window.addEventListener('scroll', (e) => handleNavigation(e));
    return () => { 
      window.removeEventListener('scroll', (e) => handleNavigation(e));
    };
  }, [y]);

  useEffect(() => {
    new WOW.WOW().init();
  }, []);

  const scrollToBottom = () => {
    setIsClick(true);
    document.getElementById('root').scrollIntoView({ behavior: 'smooth', block: 'end' });
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
        <object id="landing-logo" className="wow pulse animate__slower" type="image/svg+xml" data="logo.svg" aria-label="logo"></object>
      </div>
      <div id="landing-page-2">
        <span id="landing-word" className="wow pulse">아직도 코딩을 공부하고 계신가요?</span>
        { isClick ? ( 
          <button className='landing-btn' onClick={()=>scrollToBottom()}>
            <span className="material-icons" id="landing-btn-arrow">expand_more</span>
          </button>
        ) : ( 
          <button className='landing-btn' style={isVisible ? fadeIn : fadeOut} onClick={()=>scrollToBottom()}>
            로그인 하러가기
            <span className="material-icons" id="landing-btn-arrow">expand_more</span>
          </button>
        )}
      </div>
      <div id="landing-page-3">
        <span className="wow pulse">혹시 코딩 공부를 더 재미있게 하고 싶진 않으신가요?</span>
      </div>
      <div id="landing-page-4">
        <span className="wow pulse">스토리로 배우는 코딩! CodeStory와 함께하세요</span>
      </div>
      <div id="landing-page-5"></div>
      <Login loginClick={loginClick}/>
    </div>
  );
}

export default Landing;