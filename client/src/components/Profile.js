import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FollowingList from './FollowingList';
import Footer from './Footer';
import '../css/profile.css';

function Profile( {userInfo, userView} ) {
  const [img, setImage] = useState(null);
  const [editmode, setEditmode] = useState(false);
  const [word, setWord] = useState('나의 한마디');
  const [showfollow, setfollow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userInfo.username === '') {
      setIsLoading(true);
      loadingUserInfo()
        .then(() => {
          setIsLoading(false);
        });
    }
  }, [userInfo]);

  const onChange = async (e) => {
    console.log(e.target.files);
    setImage(e.target.files[0]);
    const formData = new FormData();
    formData.append('photourl', img);
    console.log(formData);
    // 서버의 upload API 호출
    // const res = await axios.post("/api/upload", formData);
  };
  
  const openEditMode = () => {
    setEditmode(true);
  };

  const closeEditMode = async () => {
    if (word.length > 0) {
      await axios.patch('https://api.codestory.academy/user', {
        word: word
      }, {
        'content-type': 'application/json',
        withCredentials: true
      });
      let user = {
        username: userInfo.username,
        photourl: userInfo.photourl,
        coin: userInfo.coin,
        ranking: userInfo.ranking,
        intro: word,
        follower: userInfo.follower,
        following: userInfo.following
      };
      userView(user);
    }
    setEditmode(false);
  };

  const updateWord = (e) => {
    if (e.target.value.length !== 0) {
      setWord(e.target.value);
    }
  };

  const showFollowingList = async () => {
    const authorization=await axios.get('https://api.codestory.academy/oauth',{
      'content-type':'application/json',
      withCredentials : true
    });
    console.log(authorization);
    setfollow(true);
  };

  const showProfile = () => {
    setfollow(false);
  };

  const loadingUserInfo = async () => {
    let user = {};
    await axios.get('https://api.codestory.academy/user', {
      'content-type': 'application/json',
      withCredentials: true
    }).then(result => {
      user = Object.assign({}, result.data);
      console.log(user);
      userView(user);
    }).catch(err => {
      console.log(err);
    });
  };

  return (
    <>
      { isLoading ?
        <h1 id="profile-loading">로딩중 입니다...</h1> :
        showfollow ? <FollowingList props={showProfile} /> :
          <div id="profile-background">
            <div id="profile-container">
              <div id="profile-out-btn">
                <Link to="/gamestart">&times;</Link>
              </div>
              <div id="profile-wrapper">
                <input id="profile-img" type="image" src={userInfo.photourl !== '../?' ? userInfo.photourl : 'profile-img.png'} onChange={(e) => onChange(e)}></input>
                { editmode ? (
                  <div id="profile-word-edit">
                    <input id="profile-word-input" onChange={(e)=>updateWord(e)}></input>
                    <a className="profile-word-btn" onClick={()=>closeEditMode()}>입력</a>
                  </div>
                ) : (
                  <div id="profile-word">
                    {userInfo.intro === '' || userInfo.intro === null ? word : userInfo.intro}
                    <a className="profile-word-btn" onClick={()=>openEditMode()}>수정</a>
                  </div>
                )} 
                <div id="profile-info">
                  <div id="profile-follower">
                    <img className="profile-icon-img" src="icon-follower.png" alt="follower"/>
                      팔로워
                    <div id="profile-follower-info">
                      {userInfo.follower} 명
                    </div>
                      팔로잉
                    <div id="profile-following-info" onClick={()=>showFollowingList()}>
                      {userInfo.following} 명
                    </div>
                  </div>
                  <div id="profile-coin">
                    <img className="profile-icon-img" src="icon-coin.png" alt="coin"/>
                      코인
                    <div id="profile-coin-info">
                      {userInfo.coin}
                    </div>
                  </div>
                  <div id="profile-ranking">
                    <img className="profile-icon-img" src="icon-ranking.png" alt="ranking"/>
                      랭킹
                    <div id="profile-ranking-info">
                      {userInfo.ranking}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      }
      <Footer />
    </>
  );
}

export default Profile;