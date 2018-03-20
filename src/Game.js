import React from 'react';
import Button from "./Button";
import Answer from "./Answer";
import Stars from './Stars';
import Numbers from "./Numbers";
import DoneFrame from "./DoneFrame";
import { range } from "lodash";

let possibleCombinationSum = function (arr, n) {
   if(arr.indexOf(n) >= 0) {return true;}
   if(arr[0] > n) {return false;}
   if(arr[arr.length - 1] > n) {
      arr.pop();
      return possibleCombinationSum(arr, n);
   }
   const listSize = arr.length, combinationsCount = (1 << listSize);
   for(let i =1; i < combinationsCount; i++ ) {
      let combinationSum = 0;
      for(let j=0; j < listSize; j++) {
         if(i & (1 << j)) { combinationSum += arr[j]; }
      }
      if(n === combinationSum) { return true; }
   }
   return false;
};


class Game extends React.Component {
    static randomNumber = () => 1 + Math.floor(Math.random()*9);
    constructor() {
        super();
        this.state = Game.initialState();
    };

    static initialState = () => {
       return {
           selectedNumbers: [],
           usedNumbers: [],
           randomNumberOfStars: Game.randomNumber(),
           answerIsCorrect: null,
           redraws: 5,
           doneStatus: "",
           elapsed: 0,
           start: Date.now(),
       };
    };

    componentDidMount() {
        const intervalId = setInterval(this.tick.bind(this), 1000);

        this.setState(
            {
                elapsed: 0,
                intervalId: intervalId,
                start: Date.now(),
            });
    };

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    };

    tick() {
        // This function is called every 50 ms. It updates the
        // elapsed counter. Calling setState causes the component to be re-rendered
        this.setState( () => ({
            elapsed: this.state.elapsed + 1,
        }), this.updateDoneStatus);
        //this.setState({elapsed: this.state.elapsed + 1}), this.updateDoneStatus);
    };

    resetGame = () => this.setState(Game.initialState());

    selectNumber = (clickedNumber) => {
    if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) { return; }
    this.setState(prevState => (
        {
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
        }));
    };

    unselectNumber = (clickedNumber) => {
      this.setState(prevState => ({
         answerIsCorrect: null,
         selectedNumbers: prevState.selectedNumbers
            .filter(number => number !== clickedNumber)
      }));
    };

    checkAnswer = () => {
      this.setState(prevState => ({
         answerIsCorrect: prevState.randomNumberOfStars ===
               prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
      }));
    };

    acceptAnswer = () => {
      this.setState(prevState => ({
         usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
         selectedNumbers: [],
         answerIsCorrect: null,
         randomNumberOfStars: Game.randomNumber(),
      }), this.updateDoneStatus);
    };

    redraw = () => {
      if(this.state.redraws === 0) { return; }
      this.setState(prevState => ({
         randomNumberOfStars: Game.randomNumber(),
         answerIsCorrect: null,
         selectedNumbers: [],
         redraws: prevState.redraws - 1,
      }), this.updateDoneStatus);
    };

    updateDoneStatus = () => {
      this.setState(prevState => {
         if(prevState.usedNumbers.length === 9) {
            return { doneStatus: 'Done. Nice!'};
         }
         if(prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
              return { doneStatus: 'Game Over!'};
         }
         if(prevState.elapsed > 60) {
             return { doneStatus: 'Out of Time!'};
         }

      })
    };

    possibleSolutions = ({randomNumberOfStars, usedNumbers}) => {
      const possibleNumbers = range(1,10).filter(number =>
         usedNumbers.indexOf(number) === -1
      );

      return possibleCombinationSum(possibleNumbers, randomNumberOfStars);
    };

    render() {
      const { selectedNumbers, randomNumberOfStars, answerIsCorrect, usedNumbers, redraws, doneStatus } = this.state;
      return <div className="container">
         <h3>Play Nine</h3>
         <hr />
         <div className="row">
            <Stars numberOfStars={randomNumberOfStars} />
            <Button selectedNumbers={selectedNumbers}
                    redraws={redraws}
                    checkAnswer={this.checkAnswer}
                    answerIsCorrect={answerIsCorrect}
                    redraw={this.redraw}
                    acceptAnswer={this.acceptAnswer}/>
            <Answer selectedNumbers={selectedNumbers}
                    unselectNumber={this.unselectNumber}
                    />
         </div>
         <br/>
         {doneStatus ?
            <DoneFrame resetGame={this.resetGame} doneStatus={doneStatus}/> :
            <Numbers selectedNumbers={selectedNumbers}
                     selectNumber={this.selectNumber}
                     usedNumbers={usedNumbers}/>
         }
         <br/>

      </div>;
    }
}

export default Game;
