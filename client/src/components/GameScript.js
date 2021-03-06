import React, { useEffect } from 'react';
import '../css/gamescript.css';
import WOW from 'wowjs';

function GameScript({ script, stage }) {

  useEffect(() => {
    new WOW.WOW({ live: false }).init();
  }, []);

  const lines = script.split('\n');

  return (
    <div id="gamescipt-container">
      <div id="gamescript-box">
        <div id="gamescript-wordbox">
          {lines.map((line, i) => <span className="gamescript-script" key={i}>{line}</span>)}
          {stage <= 2
            ? <img className="wow pulse infinite" id="gamescript-man-img" src="man.png" alt="man"/>
            : (stage >= 10
              ? <img className="wow pulse infinite" id="gamescript-tux-img" src="tux.png" alt="tux"/>
              : <img className="wow pulse infinite" id="gamescript-qman-img" src="question_man.png" alt="man"/>
            )
          }
        </div>
        {stage <= 2
          ? <img id="gamescript-tail-left-img" src="wordcloud_tail.png" alt="cloud tail left"/>
          : <img id="gamescript-tail-right-img" src="wordcloud_tail_right.png" alt="cloud tail right"/>
        }
      </div>
    </div>
  );
}

export default GameScript;
