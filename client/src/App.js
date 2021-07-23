import React, { useState } from 'react';
import Nav from './components/Nav';
import Ranking from './components/Ranking';
import Profile from './components/Profile';
import GameStart from './pages/GameStart';
import Game from './components/Game';
import Login from './components/Login';
import Landing from './pages/Landing';
import Footer from './components/Footer';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [oauthToken, setOauthToken]= useState('');
  console.log(oauthToken);

  const loginClick = () => {
    setIsLogin(true);
  };

  return (
    <BrowserRouter>
      <Nav props={isLogin}/>
      <Switch>
        <Route exact={true} path="/">
          <Landing />
        </Route>
        <Route path="/login">
          <Login loginClick={loginClick} setOauthToken={setOauthToken}/>
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
      <Footer />
    </BrowserRouter>
  );
}

export default App;
