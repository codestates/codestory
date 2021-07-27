import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/profile.css';
import FollowingList from './FollowingList';
import Footer from '../components/Footer';
import axios from 'axios';

function Profile( {userInfo, userView, followingList} ) {
  const [editmode, setEditmode] = useState(false);
  const [word, setWord] = useState('나의 한마디');
  const [showfollow, setfollow] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const serverUrl='https://api.codestory.academy';

  // useEffect(() => {
  //   if (userInfo.username === '') {
  //     setIsLoading(true);
  //     loadingUserInfo()
  //       .then(() => {
  //         setIsLoading(false);
  //       });
  //   }
  // }, [userInfo]);

  const sendFile =  async (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    const res = await axios.post(serverUrl+'/user/image', formData,{
      'content-type' : 'application/json',
      withCredentials : true
    });
    const user = {
      username : userInfo.username,
      photourl : res.data,
      coin : userInfo.coin,
      ranking : userInfo.ranking,
      intro : userInfo.intro,
      follower : userInfo.follower,
      following : userInfo.following
    };

    console.log(user);
    await userView(user);
    await setEditmode(false);
  };
  
  const openEditMode = () => {
    setEditmode(true);
  };

  const closeEditMode = async () => {
    if (word.length > 0) {
      await axios.patch(serverUrl+'/user', {
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
    setfollow(true);
  };

  const showProfile = () => {
    setfollow(false);
  };

  // const loadingUserInfo = async () => {
  //   let user = {};
  //   await axios.get(serverUrl+'/user', {
  //     'content-type': 'application/json',
  //     withCredentials: true
  //   }).then(result => {
  //     user = Object.assign({}, result.data);
  //     console.log(user);
  //     userView(user);
  //   }).catch(err => {
  //     console.log(err);
  //   });
  // };

  return (
    <>
      { !userInfo.username ?
        <h1 id="profile-loading">로딩중 입니다...</h1> :
        showfollow ? <FollowingList showProfile={showProfile} followingList={followingList} userInfo={userInfo}/> :
          <div id="profile-background">
            <div id="profile-container">
              <div id="profile-out-btn">
                <Link to="/gamestart">&times;</Link>
              </div>
              <div id="profile-wrapper">
                <input id="profile-img" type="image" src={userInfo.photourl !== '../?' ? userInfo.photourl : 'profile-img.png'}></input>
                { editmode ? (
                  <>
                    <input type="file" name="file" onChange={sendFile}/>
                    <div id="profile-word-edit">
                      <input id="profile-word-input" onChange={(e)=>updateWord(e)}></input>
                      <a className="profile-word-btn" onClick={()=>closeEditMode()}>입력</a>
                    </div>
                  </>
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
