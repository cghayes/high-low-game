import React from 'react';
import ReactDOM from 'react-dom';
// import HighLowGame from './HighLowGame';
// import HighLowGame from './Testing';
// import GameSession from './GameSession';
// import Timer from './Timer';
import GameContainer from './HighLowGame';

var destination=document.querySelector("#container")

ReactDOM.render(
  <div>
    <GameContainer/>
  </div>,
  destination
);
