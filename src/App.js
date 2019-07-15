//TODO: STEP 1 - Import the useState hook.
import React, { useState } from "react";
import "./App.css";
import BottomRow from "./BottomRow";

function App() {
  //TODO: STEP 2 - Establish your applictaion's state with some useState hooks.  You'll need one for the home score and another for the away score.
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

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
        <BottomRow />
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
      </section>
    </div>
  );
}

export default App;
