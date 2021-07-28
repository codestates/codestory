import React from 'react';
import { Link } from 'react-router-dom';
import '../css/gamegui.css';

function GameGui({ stage, wd }) {

  const guiHash = {
    '0': [],
    '1': [['', 'folder'], ['', 'folder'], ['', 'folder'], ['', 'folder'], ['', 'folder'], ['', 'folder'], ['', 'folder'], ['open_me', 'folder'], ['read_me', 'file']],
    '2': [['', 'folder'], ['', 'folder'], ['', 'folder'], ['', 'folder'], ['', 'folder'], ['', 'folder'], ['', 'folder'], ['open_me', 'folder'], ['read_me', 'file']],
    '3': [['', 'folder'], ['', 'folder'], ['', 'folder'], ['', 'folder'], ['', 'folder'], ['', 'folder'], ['', 'folder'], ['open_me', 'folder'], ['read_me', 'file']],
    '4-1': [],
    '4-2': [['바보', 'folder']],
    '5': [['code_story', 'folder']],
    '6-1': [],
    '6-2': [],
    '6-3': [],
    '7-1': [['error', 'file']],
    '7-2': [['error', 'file']],
    '8':[],
    undefined: []
  };

  return (
    <div id="gamegui-container">
      <div id="gamegui-box">
        <div id="gamegui-titlebar">
          <span id="gamegui-titlebar-title">Stage {stage}</span>
          <span id="gamegui-titlebar-workingdirectory">{wd}</span>
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
              guiHash[stage]
                .map(([fileName, type], idx) => {
                  if (idx < 9) {
                    return (
                      <div className="gamegui-filebox" key={idx}>
                        <img id="gamegui-file-img" src={{ folder: 'folder_icon.png', file: 'file_icon.png' }[type]} alt="file icon"/>
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
