import React, { Component } from 'react';
import './main.css';

class GameContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newRand: Math.floor(Math.random() * 999) + 1,
      time: 10,
      message: "Enter a number to begin:",
      guessResult: "High or low?",
      interval: 0,
      userGuess: "",
      guessCount: 0,
      winCount: 0,
      loseCount: 0
    };

    this.tick = this.tick.bind(this);
    this.handleForm = this.handleForm.bind(this);
    this.currentGame = this.currentGame.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.reset = this.reset.bind(this);
  }

  // Reset state for new game:
  reset() {
    this.setState({
      newRand: Math.floor(Math.random() * 999),
      // message: "Enter a new number to start the game.",
      guessCount: 0,
      time: 10,
      userGuess:""
    });
    clearInterval(this.interval);
    console.log("New Random Number: " + this.state.newRand);
  };

  // Assign entered value to userGuess:
  updateInput(e){
    this.setState({
      userGuess: e.target.value
    });
  }

  // Clear input in guess field:
  clearInput(){
    this.setState({
      userGuess:""
    });
    this.refs.guess_field.focus(); // Keep focus in the guess box.
  }

  // Define behavior to prevent DOM from refreshing:
  handleForm(e) {
      e.preventDefault();
      this.currentGame(e);
      console.log("Prevented default.");
    };

  // Timer tick:
  tick() {
    // if (this.state.time > 0) {
      this.setState({
        time: this.state.time - 1,
        message: this.state.message = "Keep guessing!"
      });
    // }
    if (this.state.time === 0) {
      this.currentGame();
    }
  }

  // ================================== //
  currentGame(){
    var newGuess = this.state.userGuess;

    // Timer start:
    if (this.state.time === 10){
        this.interval = setInterval(
          () => this.tick(),
          1000
        );
    // Add 1 to loseCount if timer reaches 0:
    } else if (this.state.time === 0) {
        this.setState({
          loseCount: this.state.loseCount + 1
        });
        this.setState({
          message: "Time's up! The random number was " + this.state.newRand + ". Enter a new number to reset and start a new game."
        });
        this.reset();
      }

    // Check user's guess input:
    if (newGuess > this.state.newRand) {
        this.setState({
            guessResult:"Last guess was too high!",
            guessCount: this.state.guessCount + 1
        });
    } else if (newGuess < this.state.newRand) {
        this.setState({
            guessResult:"Last guess was too low!",
            guessCount: this.state.guessCount + 1
        });
    } else {
        this.setState({
            guessResult: "You got it! The random number was " + this.state.newRand + ".",
            winCount: this.state.winCount + 1
        });
        this.reset();
    }

    this.clearInput();
  } // End currentGame


  // ================================== //
  componentDidMount() {
    this.refs.guess_field.focus();
    console.log("Component Mounted.");
    console.log("Random Number: " + this.state.newRand);
  }

  componentWillUnmount() {
    console.log("Component Will Unmount.");
  }

  shouldComponentUpdate (newProps, newState) {
    console.log ("Should Component Update?");
    return true;
  }

  componentDidUpdate (currentProps, currentState) {
    console.log("Component Did Update.");
  }


  render() {
    return (
      <div className="container">
      <h1>Guess the Number</h1>
      <h3>Guess the random number between 1 and 999.</h3>
      <p>You have 60 seconds to guess the correct number. The timer will begin when you enter your first guess.</p>
      <p>{this.state.message}</p>
        <form onSubmit={this.handleForm}>
            <input className="guess-field" type="number" value={this.state.userGuess} onChange={this.updateInput}
            onFocus={e=>e.currentTarget.select()} placeholder="Enter guess"
            ref="guess_field"></input>
            <button type="submit">Guess</button>
        </form>
        <p>{this.state.guessResult}</p>
        <p>Time Remaining: {this.state.time}</p>
        <p>Guesses taken this round: {this.state.guessCount}</p>
        <p>Times Won: {this.state.winCount}</p>
        <p>Times Lost: {this.state.loseCount}</p>
      </div>
    );
  }
}

export default GameContainer;
