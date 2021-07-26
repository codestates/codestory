import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/ranking.css';

function Ranking({ ranking, rankingHandler }) {

  let rankingList = [...ranking.data];

  console.log(rankingList);
  const followHandler = async (e) => {
    if (e.following === 'me') {
      return;
    } else if (e.following === false) {
      await axios.post('https://api.codestory.academy/follower', {
        username: e.username
      }, {
        'content-type': 'application/json',
        withCredentials: true
      }).then((result) => {
        rankingList = rankingList.map((rank) => {
          if (rank.username === e.username) {
            rank.following = result.data.result;
            return rank;
          }
          return rank;
        });
        rankingHandler(rankingList);
      });
    } else if (e.following === true) {
      await axios.delete('https://api.codestory.academy/follower', {
        data: {
          username: e.username
        },'content-type': 'application/json',
        withCredentials: true
      }).then(() => {
        rankingList = rankingList.map((rank) => {
          if (rank.username === e.username) {
            rank.following = false;
            return rank;
          }
          return rank;
        });
        rankingHandler(rankingList);
      });
    }
  };

  return (
    <>
      {ranking.data.length === 0 ?
        <h1 id="ranking-loading">Loading ...</h1> :
        <div id="ranking-background">
          <img id="crown" src="crown.png" />
          <div id="ranking-container">
            <div className="ranking-wrapper">
              <div className="ranking-podium">
                <Link to="/gamestart">
                  <div id="ranking-out-btn">&times;</div>
                </Link>
                {rankingList.slice(0, 3).map((rank, index) => {
                  return (
                    <div className="ranking-mvp" key={rank.username}>
                      <div className={`userlist-username number${index + 1}`}>
                        {rank.username ? rank.username : ''}
                      </div>
                      <img id={`no${index + 1}`} src={rank.photourl === '../?' || rank.photourl === 'img.com' ? 'profile-img.png' : rank.photourl} alt={`${index + 1}등`} />
                      <span id={`number${index + 1}`}>{index + 1}</span>
                      <button className={`userlist-follow-btn btn${index + 1}`} onClick={() => followHandler(rank)}>
                        {rank.following === 'me' ? 'me' : rank.following === true ? '언팔로우' : '팔로우'}
                      </button>
                    </div>
                  );
                })}
                <div className="ranking-mvp-number">
                  <img id="podium" src="podium1.png" alt="podium" />
                </div>
              </div>
              <div className="ranking-list">
                {rankingList.slice(3, 6).map((rank, index) => {
                  return (
                    <div id="userlist-container" key={rank.username}>
                      <div className="userlist-left">
                        <span className="userlist-number">
                          {index + 4}
                        </span>
                        <span className="userlist-username">
                          {rank.username}
                        </span>
                      </div>
                      <button className="userlist-follow-btn" onClick={() => followHandler(rank)}>
                        {rank.following === 'me' ? 'me' : rank.following === true ? '언팔로우' : '팔로우'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default Ranking;