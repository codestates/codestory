import React, { useEffect } from 'react';
import WOW from 'wowjs';

function Landing() {
  useEffect(() => {
    new WOW.WOW().init();
  }, []);

  return (
    <div id="landing-container">
      <object id="landing-logo" className="wow pulse animate__slower" type="image/svg+xml" data="logo.svg" aria-label="logo"></object>
      <span className="wow pulse">아직도 코딩을 공부하고 계신가요?</span>
      <span className="wow pulse">혹시 코딩 공부를 더 재미있게 하고 싶진 않으신가요?</span>
      <span className="wow pulse">스토리로 배우는 코딩! CodeStory와 함께하세요</span>
    </div>
  );
} 

export default Landing;