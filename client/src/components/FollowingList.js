import React from 'react';
import { Link } from 'react-router-dom';
import '../css/follow.css';

function FollowList() {
	
  return (
    <div id="followinglist-background">
      <div id="followinglist-container">
        <div id="followinglist-out-btn">
          <Link to="/game">&times;</Link>
        </div>
        <div id="followinglist-title">
          Following List
        </div>
        <div className="followinglist-userinfo">
          <img className="profile-picture" src="profile-img.png" />
          <span className="followinglist-username">Kimcoding</span>
        </div>
        <div className="followinglist-wrapper">
          {/* 여기서부터 리스트 */}
          <div className="userlist-wrapper">
            <span className="followinglist-number">
              1
            </span>
            <span className="followinglist-listname">
              parkhacker 
            </span>
          </div>
          <div className="userlist-wrapper">
            <span className="followinglist-number">
              2
            </span>
            <span className="followinglist-listname">
            leehacker
            </span>
          </div>
          <div className="userlist-wrapper">
            <span className="followinglist-number">
              3
            </span>
            <span className="followinglist-listname">
            kimhacker
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FollowList ;