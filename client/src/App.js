import React, { useState } from 'react';
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

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [oauthToken, setOauthToken]= useState('초기토근');

  console.log(oauthToken);

  const loginClick = () => {
    setIsLogin(true);
  };

  const newOauthToken= (accessToken)=>{
    setOauthToken(accessToken);
  };

  return (
    <>
      <MobileView>
        <MobileError />
      </MobileView>
      <BrowserRouter>
        <BrowserView>
          <Nav props={isLogin}/>
          <Switch>
            <Route exact={true} path="/">
              <Landing loginClick={loginClick}/>
              <Footer />
            </Route>
            <Route path="/gamestart">
              <GameStart loginClick={loginClick} newOauthToken={newOauthToken} />
            </Route>
            <Route path="/ranking">
              <Ranking />
            </Route>
            <Route path="/profile">
              <Profile />
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
