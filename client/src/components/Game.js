import React, { useEffect, useState } from 'react';
import GameCli from './GameCli';
import GameScript from './GameScript';
import GameGui from './GameGui';
import Footer from './Footer';
import WOW from 'wowjs';
import '../css/game.css';
// import axios from 'axios';

function Game() {

  const [isCorrect, setIsCorrect] = useState(null);
  const [currentStage, setCurrentStage] = useState(1);

  useEffect(() => {
    new WOW.WOW({ live: false }).init();
  }, []);

  const checker = async ( req ) => {
    console.log(`checking request = ${req}`);
    // let res = await axios.post('', { answer: req });
    let res = '';
    if (res) {
      setIsCorrect(true);
      setCurrentStage(currentStage + 1);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <>
      <div id="game-background">
        <div id="game-container">
          {isCorrect ? <div id="game-popup"></div> : null }
          <div id="game-leftside">
            <GameScript props={currentStage}/>
            <div id="game-images">
              <img id="game-man-img" src="question_man.png" alt="man"/>
              <img id="game-tail-img" src="wordcloud_tail_right.png" alt="wordcloud tail"/>
            </div>
            <GameCli props={currentStage} checker={checker}/>
          </div>
          <span className="material-icons" id="game-arrow">double_arrow</span>
          <div id="game-rightside">
            <GameGui props={currentStage}/>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Game;
