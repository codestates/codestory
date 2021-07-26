import React, { useEffect, useState } from 'react';
import GameCli from './GameCli';
import GameScript from './GameScript';
import GameGui from './GameGui';
import Footer from './Footer';
import WOW from 'wowjs';
import '../css/game.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Game() {

  const [script, setScript] = useState('Now loading...');
  const [isWaiting, setIsWaiting] = useState(true);
  const [isFinish, setIsFinish] = useState(false);
  const [wd, setWd] = useState('Desktop');
  const [stageIndex, setStageIndex] = useState(0);
  const stageArr = ['0', '1', '2', '3', '4', '5-1', '5-2', '6-1', '6-2', '6-3', '7-1', '7-2', '8'];

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

  const handleWdChange = (wd) => {
    setWd(wd);
  };

  const handleFinish = () => {
    setIsFinish(true);
  };

  return (
    <>
      <div id="game-background">
        { isFinish ? 
          <div id="game-finish-background">
            <div id="game-finish">
              <img id="game-congrats-img-left" src="congrats_icon_left.png" alt="congrats icon"/>
              <div id="game-finish-wordbox">
                <span id="game-finish-word">스테이지 클리어!</span>
                <Link to="/gamestart">
                  <div id="game-finish-btn">확인</div>
                </Link>
              </div>
              <img id="game-congrats-img-right" src="congrats_icon_right.png" alt="congrats icon"/>
            </div>
          </div> 
          : null }
        <div id="game-container">
          <div id="game-leftside">
            <GameScript 
              script={script}
              stage={stageIndex}
            />
            <GameCli
              stage={stageArr[stageIndex]}
              handleStageChange={handleStageChange}
              isWaiting={isWaiting}
              handleWaiting={handleWaiting}
              wd={wd}
              handleWdChange={handleWdChange}
              handleFinish={handleFinish}
            />
          </div>
          <span className="material-icons" id="game-arrow">double_arrow</span>
          <div id="game-rightside">
            <GameGui stage={stageArr[stageIndex]} wd={wd} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Game;
