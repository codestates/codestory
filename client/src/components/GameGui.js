import React from 'react';
import { Link } from 'react-router-dom';
import '../css/gamegui.css';

function GameGui(currentStage) {
  return (
    <div id="gamegui-container">
      <div id="gamegui-box">
        <div id="gamegui-titlebar">
          <span id="gamegui-titlebar-title">Stage {currentStage.props}</span>
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
            <div className="gamegui-filebox">
              <img id="gamegui-file-img" src="file_icon.png" alt="file icon"/>
              <div id="gamegui-filename">test1</div>
            </div>
            <div className="gamegui-filebox">
              <img id="gamegui-file-img" src="file_icon.png" alt="file icon"/>
              <div id="gamegui-filename">test2</div>
            </div>
            <div className="gamegui-filebox">
              <img id="gamegui-file-img" src="file_icon.png" alt="file icon"/>
              <div id="gamegui-filename">test3</div>
            </div>
            <div className="gamegui-filebox">
              <img id="gamegui-file-img" src="file_icon.png" alt="file icon"/>
              <div id="gamegui-filename">test4</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameGui;
