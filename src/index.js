import React from 'react';
import ReactDOM from 'react-dom';
import HighLowGame from './HighLowGame';

var destination=document.querySelector("#container")

ReactDOM.render(
  <div>
    <HighLowGame/>
  </div>,
  destination
);
