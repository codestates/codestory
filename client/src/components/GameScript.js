import React from 'react';
import '../css/gamescript.css';

function GameScript(currentStage) {
  return (
    <div id="gamescipt-container">
      <div id="gamescript-box">
        <div id="gamescript-word">
          <span>현재 스테이지는 {currentStage.props} 입니다.</span>
        </div>
      </div>
    </div>
  );
}

export default GameScript;
