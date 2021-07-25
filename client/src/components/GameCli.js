import React, { useEffect, useState } from 'react';
import '../css/gamecli.css';
import axios from 'axios';

function GameCli({ stage, handleStageChange, isWaiting, handleWaiting }) {

  const [command, setCommand] = useState('');
  const [cli, setCli] = useState(['Last login: Fri Jul 23 18:06:34 on ttys004']);
  const [wd, setWd] = useState('Desktop');
  const [enterCount, setEnterCount] = useState(0);
  const [isPassword, setIsPassword] = useState(false);

  useEffect(() => {
    (async () => {
      const result = await axios.post('https://api.codestory.academy/game/answer', { stage, command }, { withCredentials: true });
      if (result.data.result) {
        handleStageChange(result.data.script);
        const commandArr = command.match(/\S+/g) || [];
        switch (commandArr[0]) {
        case 'cd':
          setWd(commandArr[1].match(/([^/]+)$/)[1]); break;
        case 'ls':
          setCli([...cli, '.password']); break;
        case 'cat':
          setCli([...cli, 'password: 1234', 'path: ~/Desktop/.hidden']); break;
        case 'sudo':
          setIsPassword(true); break;
        }
      }
      else {
        setCli([...cli, isPassword ? 'ERROR: Permission denied' : `command not found: ${command}`]);
      }
      setCommand('');
      handleWaiting();
    })();
  }, [enterCount]);

  const inputText = (e) => {
    setCommand((isPassword ? command : '') + e.target.value);
  };

  const onKeyPress = async (e) => {
    if(e.charCode === 13) {
      setCli([...cli, isPassword ? 'Password:' : `${wd} $ ${command}`]);
      handleWaiting();
      setEnterCount(enterCount + 1);
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
              {cli.map((line, i) => <div key={i}>{line}</div>)}
              {isWaiting
                ? <div>잠시 기다려주세요</div>
                : <div className="GameCli-inputwrapper">
                  {isPassword ? 'Password:' : `${wd} $`}
                  <input
                    className="input-command"
                    type="text"
                    placeholder={isPassword ? '' : '명령어를 입력하세요'}
                    value={isPassword ? '' : command}
                    onChange={inputText}
                    onKeyPress={onKeyPress}
                    autoFocus
                  ></input>
                </div>}
            </div>
            <div className="GameCli-scroll"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GameCli;
