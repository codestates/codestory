import React, { useState } from 'react';
import '../css/gamecli.css';
// import axios from 'axios';

function GameCli({ props, checker }) {

  const [command, setCommand] = useState('');
  const [firstCommand, setFirstCommand] = useState('');
  const [secondCommand, setsecondCommand] = useState('');
  const [currentCli, setCurrentCli] = useState('');
  const [currentLine, setCurrentLine] = useState(1);

  const inputText = (e) => {
    setCommand(e.target.value);
  };

  const onKeyPress = (e) => {
    if(e.charCode === 13) {
      checker(command);
      setCurrentCli(command);
      setCurrentLine(currentLine + 1);
      if (currentLine === 1) {
        setFirstCommand(command);
      } else if (currentLine === 2) {
        setsecondCommand(command);
      } else if (currentLine === 3) {
        setCurrentLine(1);
      }
      setCommand('');
    }
  };

  return (
    <>
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
              <div className="GameCli-command command">current stage: { props }</div>
              {currentLine === 1 ? (
                <div className="GameCli-inputwrapper">
                  ~
                  <input
                    className="input-command"
                    type="text"
                    placeholder="명령어를 입력하세요"
                    value={command}
                    onChange={inputText}
                    onKeyPress={onKeyPress}
                  ></input>
                </div>
              ) : (
                null
              )}
              {currentLine === 2 ? (
                <>
                  <div className="GameCli-command command">command not found: {currentCli}</div> 
                  <div className="GameCli-inputwrapper">
                    ~
                    <input
                      className="input-command"
                      type="text"
                      placeholder="명령어를 입력하세요"
                      value={command}
                      onChange={inputText}
                      onKeyPress={onKeyPress}
                    ></input>
                  </div>
                </>
              ) : (
                null
              )}
              {currentLine === 3 ? (
                <>
                  <div className="GameCli-command command">command not found: {firstCommand}</div> 
                  <div className="GameCli-command command">command not found: {currentCli}</div> 
                  <div className="GameCli-inputwrapper">
                    ~
                    <input
                      className="input-command"
                      type="text"
                      placeholder="명령어를 입력하세요"
                      value={command}
                      onChange={inputText}
                      onKeyPress={onKeyPress}
                    ></input>
                  </div>
                </>
              ) : (
                null
              )}
              {currentLine === 4 ? (
                <>
                  <div className="GameCli-command command">command not found: {firstCommand}</div> 
                  <div className="GameCli-command command">command not found: {secondCommand}</div> 
                  <div className="GameCli-command command">command not found: {currentCli}</div> 
                  <div className="GameCli-inputwrapper">
                    ~
                    <input
                      className="input-command"
                      type="text"
                      placeholder="명령어를 입력하세요"
                      value={command}
                      onChange={inputText}
                      onKeyPress={onKeyPress}
                    ></input>
                  </div>
                </>
              ) : (
                null
              )}
            </div>
            <div className="GameCli-scroll"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GameCli;
