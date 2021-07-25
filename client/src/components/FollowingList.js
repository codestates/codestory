import React from 'react';
import '../css/followinglist.css';

function FollowingList(showProfile) {
	
  return (
    <div id="followinglist-background">
      <div id="followinglist-container">
        <div id="followinglist-out-btn" onClick={()=>showProfile.props()}>&times;</div>
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

export default FollowingList ;