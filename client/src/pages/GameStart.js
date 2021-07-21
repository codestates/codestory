import React from 'react';
import { Link } from 'react-router-dom';

function GameStart() {
  return (
    <div id="gamestart-container">
      <div id="game-btn">
        <Link to="/game">게임시작</Link>
      </div>
    </div>
  );
}

export default GameStart;