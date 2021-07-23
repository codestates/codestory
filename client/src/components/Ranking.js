import React from 'react';
// import axios from 'axios';
import '../css/ranking.css';

function Ranking() {

  return (
    <div id="ranking-background">
      <img id="crown" src="crown.png" />
      <div id="ranking-container">
        <div className="ranking-wrapper">
          <div className="ranking-podium">
            <div className="ranking-mvp">
              <span className="userlist-username no1">
                kimcoding
              </span>
              <span className="userlist-username no2">
                kimcoding
              </span>
              <span className="userlist-username no3">
                kimcoding
              </span>
              <img id="second" src="profile-img.png" alt="2등" />
              <img id="first" src="profile-img.png" alt="1등" />
              <img id="third" src="profile-img.png" alt="3등" />
            </div>
            <div className="ranking-mvp-number">
              <span id="number1">1</span>
              <button className="userlist-follow-btn btn1">
                팔로우
              </button>
              <span id="number2">2</span>
              <button className="userlist-follow-btn btn2">
                팔로우
              </button>
              <span id="number3">3</span>
              <button className="userlist-follow-btn btn3">
                팔로우
              </button>
              <img id="podium" src="podium1.png" alt="podium" />
            </div>
          </div>
          <div className="ranking-list">
            <div id="userlist-container">
              <div className="userlist-left">
                <span className="userlist-number">
                  4
                </span>
                <span className="userlist-username">
                  kimcoding
                </span>
              </div>
              <button className="userlist-follow-btn">
                팔로우
              </button>
            </div>
            <div id="userlist-container">
              <div className="userlist-left">
                <span className="userlist-number">
                  5
                </span>
                <span className="userlist-username">
                  parkhacker
                </span>
              </div>
              <button className="userlist-follow-btn">
                팔로우
              </button>
            </div>
            <div id="userlist-container">
              <div className="userlist-left">
                <span className="userlist-number">
                  6
                </span>
                <span className="userlist-username">
                  Leecoder
                </span>
              </div>
              <button className="userlist-follow-btn">
                팔로우
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ranking;