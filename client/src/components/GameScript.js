import React from 'react';
import '../css/gamescript.css';

function GameScript({ script }) {
  const lines = script.split('\n');
  return (
    <div id="gamescipt-container">
      <div id="gamescript-box">
        <div id="gamescript-word">
          {lines.map((line, i) => <span key={i}>{line}<br /></span>)}
        </div>
      </div>
    </div>
  );
}

export default GameScript;
