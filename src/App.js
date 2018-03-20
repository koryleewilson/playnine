import React, { Component } from 'react';
import Game from './Game';
import './App.css';
//import 'bootstrap';

class App extends Component {
  render() {
     return <div>
        <Game  start={Date.now()}/>

     </div>;
  }
}

export default App;
