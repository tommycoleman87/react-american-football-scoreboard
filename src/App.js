//TODO: STEP 1 - Import the useState hook.
import React, { useState } from "react";
import "./App.css";
import BottomRow from "./BottomRow";

function App() {
  //TODO: STEP 2 - Establish your applictaion's state with some useState hooks.  You'll need one for the home score and another for the away score.
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [quarter, setQuarter] = useState(1);
  const [yardsToGo, setYards] = useState(0);

  const scoreHandler = (team, typeOfScore) => {
    if(team === 'Lions') {
      switch(typeOfScore === 'touchDown') {
        case true: 
        return setHomeScore(homeScore + 6);
        case false: 
        return setHomeScore(homeScore + 3);
        default: 
        return homeScore;
      }
    } else if(team === 'Tigers') {
      switch(typeOfScore === 'touchDown') {
        case true: 
        return setAwayScore(awayScore + 6);
        case false: 
        return setAwayScore(awayScore + 3);
        default: 
        return awayScore;
      }
    } else {
      return;
    }
  }

  const yardsToGoHandler = (event) => {
    console.log(event.target.value.length)
    if(event.target.value <= 10 && event.target.value.length > 0) {
    return setYards(event.target.value)
  }
  }

  return (
    <div className="container">
      <section className="scoreboard">
        <div className="topRow">
          <div className="home">
            <h2 className="home__name">Lions</h2>

            {/* TODO STEP 3 - We need to change the hardcoded values in these divs to accept dynamic values from our state. */}

            <div className="home__score">{homeScore}</div>
          </div>
          <div className="timer">00:03</div>
          <div className="away">
            <h2 className="away__name">Tigers</h2>
            <div className="away__score">{awayScore}</div>
          </div>
        </div>
        <BottomRow quarter={quarter} yardsToGo={yardsToGo}/>
      </section>
      <section className="buttons">
        <div className="homeButtons">
          {/* TODO STEP 4 - Now we need to attach our state setter functions to click listeners. */}
          <button className="homeButtons__touchdown" onClick={() => scoreHandler('Lions', 'touchDown')}>Home Touchdown</button>
          <button className="homeButtons__fieldGoal" onClick={() => scoreHandler('Lions', 'fieldGoal')}>Home Field Goal</button>
        </div>
        <div className="awayButtons">
          <button className="awayButtons__touchdown" onClick={() => scoreHandler('Tigers', 'touchDown')}>Away Touchdown</button>
          <button className="awayButtons__fieldGoal" onClick={() => scoreHandler('Tigers', 'fieldGoal')}>Away Field Goal</button>
        </div>
        <div className="bottomButtons">
          <button className="downButton" onClick={() => setQuarter(quarter < 4 ? quarter + 1 : quarter - 3)}>Change Downs</button>
          <button className="quarterButton" onClick={() => setQuarter(quarter < 4 ? quarter + 1 : quarter - 3)}>Change Quarter</button>
        </div>
        <div className="bottomInputs">
          <input className="yardsToGo" type="number" onChange={(event) => yardsToGoHandler(event)}/>
          <button className="ballOnButton" onClick={() => setQuarter(quarter < 4 ? quarter + 1 : quarter - 3)}>Change Ball On</button>
        </div>
        
      </section>
    </div>
  );
}

export default App;
