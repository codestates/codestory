import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/profile.css';
import FollowingList from './FollowingList';
// import axios from 'axios';

function Profile() {
  const [img, setImage] = useState(null);
  const [editmode, setEditmode] = useState(false);
  const [word, setWord] = useState('나의 한 마디');
  const [showfollow, setfollow] = useState(false);

  const onChange = async (e) => {
    setImage(e.target.files[0]);
    const formData = new FormData();
    formData.append('file', img);
    // 서버의 upload API 호출
    // const res = await axios.post("/api/upload", formData);
  };

  const openEditMode = () => {
    setEditmode(true);
  };

  const closeEditMode = () => {
    setEditmode(false);
  };

  const updateWord = (e) => {
    if (e.target.value.length !== 0) {
      setWord(e.target.value);
    }
  };

  const showFollowingList = () => {
    setfollow(true);
  };

  const showProfile = () => {
    setfollow(false);
  };

  return (
    <>
      { showfollow ? <FollowingList props={showProfile}/> :
        <div id="profile-background">
          <div id="profile-container">
            <div id="profile-out-btn">
              <Link to="/gamestart">&times;</Link>
            </div>
            <div id="profile-wrapper">
              <input id="profile-img" type="image" src="profile-img.png" onChange={(e)=>onChange(e)}></input>
              { editmode ? (
                <div id="profile-word-edit">
                  <input id="profile-word-input" onChange={(e)=>updateWord(e)}></input>
                  <a id="profile-word-btn" onClick={()=>closeEditMode()}>입력</a>
                </div>
              ) : (
                <div id="profile-word">
                  {word}
                  <a id="profile-word-btn" onClick={()=>openEditMode()}>수정</a>
                </div>
              )} 
              <div id="profile-info">
                <div id="profile-follower">
                  <img className="profile-icon-img" src="icon-follower.png" alt="follower"/>
                    팔로워
                  <div id="profile-follower-info">
                    10 명
                  </div>
                    팔로잉
                  <div id="profile-following-info" onClick={()=>showFollowingList()}>
                    3 명
                  </div>
                </div>
                <div id="profile-coin">
                  <img className="profile-icon-img" src="icon-coin.png" alt="coin"/>
                    코인
                  <div id="profile-coin-info">
                    100
                  </div>
                </div>
                <div id="profile-ranking">
                  <img className="profile-icon-img" src="icon-ranking.png" alt="ranking"/>
                    랭킹
                  <div id="profile-ranking-info">
                    1 등
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default Profile;