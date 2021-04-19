import React, { Component } from 'react';


class HighLowGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newRand: Math.floor(Math.random() * 999) + 1,
      time: 60,
      startMessage: "Enter a number to begin:",
      resultMessage: "---",
      guessResult: "---",
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
      // guessResult: "High or low?",
      guessCount: 0,
      time: 60,
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
      });
    // }
    if (this.state.time === 0) {
      this.currentGame();
    }
  }

  // ================================== //
  currentGame() {
    var newGuess = this.state.userGuess;

    // Timer start:
    if (this.state.time === 60) {
        this.interval = setInterval(
          () => this.tick(),
          1000
        );
    }
    // Add 1 to loseCount if timer reaches 0:
    if (this.state.time === 0) {
        this.setState({
          loseCount: this.state.loseCount + 1,
          startMessage: "Enter a new number to reset and start a new game.",
          guessResult: "You lose!",
          resultMessage: "Time's up! The random number was " + this.state.newRand + "."
        });
        this.reset();
        // Check user's guess input:
      } else if (newGuess > this.state.newRand) {
        this.setState({
            guessResult: newGuess + " is too high!",
            guessCount: this.state.guessCount + 1,
            resultMessage: this.state.resultMessage = "Keep guessing!"
        });
    } else if (newGuess < this.state.newRand) {
        this.setState({
            guessResult: newGuess + " is too low!",
            guessCount: this.state.guessCount + 1,
            resultMessage: this.state.resultMessage = "Keep guessing!"
        });
    } else {
        this.setState({
            guessResult: "You got it!",
            resultMessage: "The random number is " + this.state.newRand + ".",
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
        <h1 className="title">High Low Game</h1>
        <h3>Guess the random number between 0 and 999.</h3>
        <ul>
        <li>You have 60 seconds to guess the correct number.</li>
        <li>The game will let you know if your guess is higher or lower than the secret random number.</li>
        <li>The 60 second timer will begin when you enter your first guess.</li>
        </ul>
        <form onSubmit={this.handleForm}>
            <p className="startMessage">{this.state.startMessage}</p>
            <input className="guess-field"
                   type="number"
                   value={this.state.userGuess}
                   onChange={this.updateInput}
                   onFocus={e=>e.currentTarget.select()}
                   placeholder="Enter guess"
                   ref="guess_field">
            </input>
            <button type="submit">Guess!</button>
        </form>
        <p className="message">{this.state.guessResult} <br /> {this.state.resultMessage}</p>
        <p>Time Remaining: <br /><span className="timer">{this.state.time}</span></p>
        <form className="info">
          <p>Guesses taken: <br /><span className="count">{this.state.guessCount}</span></p>
          <p>Games Won: <br /><span className="count">{this.state.winCount}</span></p>
          <p>Games Lost: <br /><span className="count">{this.state.loseCount}</span></p>
        </form>
      </div>
    );
  }
}

export default HighLowGame;
