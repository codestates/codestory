import React, { useEffect, useState } from 'react';
import GameCli from './GameCli';
import GameScript from './GameScript';
import GameGui from './GameGui';
import Footer from './Footer';
import WOW from 'wowjs';
import '../css/game.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Game({ userInfo, userView, rankingHandler }) {
  
  const serverUrl = 'https://api.codestory.academy';
  const stageArr = ['0', '1', '2', '3', '4-1', '4-2', '5', '6-1', '6-2', '6-3', '7-1', '7-2', '8'];
  const [stageIndex, setStageIndex] = useState(0);
  const [script, setScript] = useState('Now loading...');
  const [wd, setWd] = useState('Desktop');
  const [isWaiting, setIsWaiting] = useState(true);
  const [isFinish, setIsFinish] = useState(false);
  const [curcoin, setCoin] = useState(0);

  useEffect(() => {
    new WOW.WOW({ live: false }).init();
    (async () => {
      const result = await axios.post(serverUrl+'/game/answer', { stage: '0', command: '' }, { withCredentials: true });
      setStageIndex(stageIndex + 1);
      setScript(result.data.script);
      setIsWaiting(false);
    })();
  }, []);
  
  const handleWaiting = () => {
    setIsWaiting(!isWaiting);
  };

  const handleStageChange = (script, isSuccess) => {
    setStageIndex(stageIndex + (isSuccess ? 1 : -1));
    if (script) {
      setScript(script);
    }
  };

  const handleWdChange = (wd) => {
    setWd(wd);
  };

  const handleFinish = () => {
    setCoin(Math.floor(Math.random() * 100));
    setIsFinish(true);
  };
  
  const handleCoin = async () => {
    let sumcoin = userInfo.coin + curcoin;
    await axios.patch(serverUrl+'/game/coin`, {
      newCoin: sumcoin
    }, {
      withCredentials: true
    });
    await axios.get(serverUrl+'/ranking`, {
      withCredentials: true
    }).then((rankinglist) => {
      rankingHandler(rankinglist.data.data);
    });
    const user = {
      username : userInfo.username,
      photourl : userInfo.photourl,
      coin : sumcoin,
      ranking : userInfo.ranking,
      intro : userInfo.intro,
      follower : userInfo.follower,
      following : userInfo.following
    }; 
    userView(user);
  };

  return (
    <>
      <div id="game-background">
        { isFinish 
          ? <div id="game-finish-background">
            <div id="game-finish">
              <img id="game-congrats-img-left" src="congrats_icon_left.png" alt="congrats icon"/>
              <div id="game-finish-wordbox">
                <span id="game-finish-word">스테이지 클리어!</span>
                <span id="game-finish-subword">{`${curcoin} 코인을 획득하였습니다.`}</span>
                <Link to="/gamestart">
                  <div id="game-finish-btn" onClick={handleCoin}>확인</div>
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
            <GameGui 
              stage={stageArr[stageIndex]} 
              wd={wd} 
             />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Game;
