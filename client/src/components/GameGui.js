import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/gamegui.css';

function GameGui(currentStage) {
  const [files, setFiles] = useState(['file1', 'file2', 'file3']);
  const [input, setInput] = useState('');

  // GUI에 생성할 파일 이름 state에 보관
  const inputFile = (e) => {
    setInput(e.target.value);
  };

  // Enter 키 입력 시 GUI 화면에 input 이름으로 파일 생성
  const setter = (e) => {
    if (e.charCode === 13) {
      setFiles([...files, input]);
    }
  };

  // GUI 화면 마지막 파일 1개 삭제
  const deleteFile = () => {
    let newFiles = [...files].slice(0, -1);
    setFiles(newFiles);
  };

  return (
    <div id="gamegui-container">
      <div id="gamegui-box">
        <div id="gamegui-titlebar">
          <span id="gamegui-titlebar-title">Stage {currentStage.props}</span>
          <input id="gamegui-test-add" 
            placeholder={'put file name & ENTER'}
            value={input} 
            onChange={(e)=>inputFile(e)}
            onKeyPress={(e)=>setter(e)}>
          </input>
          <button id="gamegui-test-delete" onClick={()=>deleteFile()}>delete</button>
          <Link to="/gamestart">
            <div id="gamegui-close">&times;</div>
          </Link>
        </div>
        <div id="gamegui-gui">
          <div id="gamegui-left">
            <div id="gamegui-directory">
              Recent <br/>
              Home <br/>
              Desktop <br/>
              Documents <br/>
              Downloads <br/>
              Music <br/>
              Pictures <br/>
              Videos <br/>
              Trash <br/>
            </div>
          </div>
          <div id="gamegui-right">
            {
              files.map((fileName, idx) => {
                if (idx < 9) {
                  return (
                    <div className="gamegui-filebox" key={idx}>
                      <img id="gamegui-file-img" src="file_icon.png" alt="file icon"/>
                      <div id="gamegui-filename">{fileName}</div>
                    </div>
                  );
                }
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameGui;
