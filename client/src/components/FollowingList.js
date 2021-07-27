import React from 'react';
import '../css/followinglist.css';

function FollowingList({ showProfile, followingList, userInfo }) {
  
  let followingLists = [...followingList.data];
	
  return (
    <>
      {!followingLists ?
        <h1 id="followinglist-loading">loading...</h1>
        : 
        <div id="followinglist-background">
          <div id="followinglist-container">
            <div id="followinglist-out-btn" onClick={showProfile}>&times;</div>
            <div id="followinglist-title">
              Following List
            </div>
            <div className="followinglist-userinfo">
              <img className="profile-picture" src="profile-img.png" />
              <span className="followinglist-username">{userInfo.username}</span>
            </div>
            <div className="followinglist-wrapper">
              {followingLists.map((following, index) => {
                return (
                  <div key={index} className="userlist-wrapper">
                    <span className="followinglist-number">
                      {index+1}
                    </span>
                    <span className="followinglist-listname">
                      {following.username}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default FollowingList ;