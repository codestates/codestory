import React from 'react';
import GameCli from './GameCli';
import GameScript from './GameScript';
import Footer from './Footer';
import '../css/game.css';
import GameGui from './GameGui';

function Game() {
  return (
    <>
      <div id="game-background">
        <div id="game-container">
          <div id="game-leftside">
            <GameScript />
            <GameCli />
          </div>
          <div id="game-rightside">
            <GameGui />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Game;
