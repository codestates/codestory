import React from 'react';
import '../css/gamecli.css';
// import axios from 'axios';

function GameCli() {
  return (
    <div id="GameCli-background">
      <div id="GameCli-container">
        <div className="GameCli-titlebar">
          <div className="GameCli-button">
            <div id="GameCli-close">&times;</div>
            <div id="GameCli-minimum">-</div>
            <div id="GameCli-maximum">□</div>
          </div>
          <div className="GameCli-displaywrapper">
            <div className="GameCli-display">
              <div>Last login: Fri Jul 23 18:06:34 on ttys004</div>
              <div className="GameCli-command1 command">ls</div>
              <div className="GameCli-command2 command">mkdir</div>
              <div className="GameCli-command3 command">cd</div>
              <div className="GameCli-command4 command">mv</div>
              <div className="GameCli-command5 command">rm</div>
              <div className="GameCli-command6 command">ls -al</div>
              <div className="GameCli-command7 command">rm -rf</div>
              <div className="GameCli-inputwrapper">
                ~
                <input
                  className="input-command"
                  type="text"
                  placeholder="명령어를 입력하세요"
                ></input>
              </div>
            </div>
            <div className="GameCli-scroll"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameCli;
