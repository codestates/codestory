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
  const [oauthToken, setOauthToken]= useState('');
  console.log(oauthToken);

  const loginClick = () => {
    setIsLogin(true);
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
              <Landing props={()=>loginClick()}/>
              <Footer />
            </Route>
            <Route path="/gamestart">
              <GameStart />
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
