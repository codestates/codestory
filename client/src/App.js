import React, { useEffect, useState } from 'react';
import Nav from './components/Nav';
import Ranking from './components/Ranking';
import Profile from './components/Profile';
import GameStart from './pages/GameStart';
import Game from './components/Game';
import Landing from './pages/Landing';
import Footer from './components/Footer';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { BrowserView, MobileView } from 'react-device-detect';
import MobileError from './pages/MobileError';
import axios from 'axios';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: '',
    photourl: '',
    coin: 0,
    intro: '',
    ranking: 0,
    follower: 0,
    following: 0
  });
  const [ranking, setRanking] = useState({ data: [] });
  const [followingList, setFollowingList] = useState({ data: [] });

  ranking;
  followingList;

  useEffect(() => {
    (async () => {
      try {
        const userInfo = await axios.get('http://localhost:4000', { withCredentials: true });
        const ranking = await axios.get('http://localhost:4000', { withCredentials: true });
        const followingList = await axios.get('http://localhost:4000', { withCredentials: true });
        setUserInfo(userInfo.data);
        setRanking(ranking.data);
        setFollowingList(followingList.data);
        setIsLogin(true);
      }
      catch {
        console.log('로그인하세요');
      }
    })();
  }, []);

  const loginClick = () => {
    setIsLogin(true);
  };

  const logoutClick = () => {
    axios.get('https://api.codestory.academy/signout', { withCredentials: true });
    setIsLogin(false);
  };

  const userView = (user) => {
    console.log('app.js user', user);
    setUserInfo({
      ...userInfo,
      username: user.username,
      photourl: user.photourl,
      coin: user.coin,
      intro: user.intro,
      ranking: user.ranking,
      follower: user.follower,
      following: user.following
    });
  };

  return (
    <>
      <MobileView>
        <MobileError />
      </MobileView>
      <BrowserRouter>
        <BrowserView>
          <Nav isLogin={isLogin} userInfo={userInfo} logoutClick={logoutClick}/>
          <Switch>
            <Route exact={true} path="/">
              <Landing loginClick={loginClick}/>
              <Footer />
            </Route>
            <Route path="/gamestart">
              <GameStart loginClick={loginClick} />
            </Route>
            <Route path="/ranking">
              <Ranking />
            </Route>
            <Route path="/profile">
              <Profile userInfo={userInfo} userView={userView} />
            </Route>
            <Route path="/game">
              <Game />
            </Route>
          </Switch>
        </BrowserView>
      </BrowserRouter>
    </>
  );
}

export default App;
