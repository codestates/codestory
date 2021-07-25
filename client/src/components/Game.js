import React, { useEffect, useState } from 'react';
import GameCli from './GameCli';
import GameScript from './GameScript';
import GameGui from './GameGui';
import Footer from './Footer';
import WOW from 'wowjs';
import '../css/game.css';
import axios from 'axios';

function Game() {

  const [script, setScript] = useState('Now loading...');
  const [isWaiting, setIsWaiting] = useState(true);
  const [stageIndex, setStageIndex] = useState(0);
  const stageArr = ['0', '1', '2', '3', '4', '5-1', '5-2', '6-1', '6-2', '6-3', '7-1', '7-2'];

  useEffect(() => {
    new WOW.WOW({ live: false }).init();
    (async () => {
      const result = await axios.post('https://api.codestory.academy/game/answer', { stage: '0', command: '' }, { withCredentials: true });
      setStageIndex(stageIndex + 1);
      setScript(result.data.script);
      setIsWaiting(false);
    })();
  }, []);

  const handleStageChange = (script, isSuccess) => {
    setStageIndex(stageIndex + (isSuccess ? 1 : -1));
    if (script) {
      setScript(script);
    }
  };

  const handleWaiting = () => {
    setIsWaiting(!isWaiting);
  };

  return (
    <>
      <div id="game-background">
        <div id="game-container">
          <div id="game-leftside">
            <GameScript script={script}/>
            <div id="game-images">
              <img id="game-man-img" src="question_man.png" alt="man"/>
              <img id="game-tail-img" src="wordcloud_tail_right.png" alt="wordcloud tail"/>
            </div>
            <GameCli
              stage={stageArr[stageIndex]}
              handleStageChange={handleStageChange}
              isWaiting={isWaiting}
              handleWaiting={handleWaiting}
            />
          </div>
          <span className="material-icons" id="game-arrow">double_arrow</span>
          <div id="game-rightside">
            <GameGui props={stageArr[stageIndex]}/>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Game;
