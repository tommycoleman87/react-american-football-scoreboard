//TODO: STEP 1 - Import the useState hook.
import React, { useState, useEffect } from "react";
import "./App.css";
import BottomRow from "./BottomRow";


function App() {
  //TODO: STEP 2 - Establish your applictaion's state with some useState hooks.  You'll need one for the home score and another for the away score.
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [quarter, setQuarter] = useState(1);
  const [yardsToGo, setYards] = useState(0);
  const [down, setDown] = useState(1);
  const [ballOn, setBallOn] = useState(0);
  const [minutes, setMinutes] = useState(15);
  const [tenSeconds, setTenSeconds] = useState(0)
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(0);
    setTenSeconds(0);
    setMinutes(15);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => {
          if(seconds === 0) {
             return seconds = 9;
          } else {
            seconds = seconds - 1;
            return seconds;
          }
        });
        setTenSeconds(tenSeconds => {
          if(seconds === 0 && tenSeconds === 0){
            tenSeconds = 5;
            return tenSeconds;
          } else if(seconds === 0) {
           tenSeconds = tenSeconds - 1;
           return tenSeconds;
          } else {
            return tenSeconds;
          }
        });
        setMinutes(minutes => {
          if(tenSeconds === 0 && seconds === 0 && minutes <= 10){
            minutes = '0' + (minutes - 1);
            return minutes;
          } else if(tenSeconds === 0 && seconds === 0) {
            minutes = minutes - 1;
            return minutes;
          } else {
            return minutes;
          }
        })
      }, 10);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    if(seconds === 0 && tenSeconds === 0 && minutes == 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  });
 

  const scoreHandler = (team, typeOfScore) => {
    if (team === "Lions") {
      switch (typeOfScore === "touchDown") {
        case true:
          return setHomeScore(homeScore + 7);
        case false:
          return setHomeScore(homeScore + 3);
        default:
          return homeScore;
      }
    } else if (team === "Tigers") {
      switch (typeOfScore === "touchDown") {
        case true:
          return setAwayScore(awayScore + 7);
        case false:
          return setAwayScore(awayScore + 3);
        default:
          return awayScore;
      }
    } else {
      return;
    }
  };

 

  const handleSubmit = event => {
    event.preventDefault();
    console.log(event.target)
    if(event.target.firstChild.classList.contains('yardsToGo')) {
      if(event.target.firstChild.value <= 10 && event.target.firstChild.value.length > 0) {
        return setYards(event.target.firstChild.value) }
        else {
          alert('Please enter in a number between 1 and 10');
        }
    } else {
      if(event.target.firstChild.value <= 100 && event.target.firstChild.value.length > 0) {
      return setBallOn(event.target.firstChild.value);
      } else {
        alert('Please enter in a number between 1 and 100')
      }
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
          <div className="timer" >{minutes}:{tenSeconds}{seconds}</div>
          <div className="away">
            <h2 className="away__name">Tigers</h2>
            <div className="away__score">{awayScore}</div>
          </div>
        </div>
        <BottomRow
          quarter={quarter}
          yardsToGo={yardsToGo}
          down={down}
          ballOn={ballOn}
        />
      </section>
      <section className="buttons">
        <div className="homeButtons">
          {/* TODO STEP 4 - Now we need to attach our state setter functions to click listeners. */}
          <button
            className="homeButtons__touchdown"
            onClick={() => scoreHandler("Lions", "touchDown")}
          >
            Home Touchdown
          </button>
          <button
            className="homeButtons__fieldGoal"
            onClick={() => scoreHandler("Lions", "fieldGoal")}
          >
            Home Field Goal
          </button>
        </div>
        <div className="awayButtons">
          <button
            className="awayButtons__touchdown"
            onClick={() => scoreHandler("Tigers", "touchDown")}
          >
            Away Touchdown
          </button>
          <button
            className="awayButtons__fieldGoal"
            onClick={() => scoreHandler("Tigers", "fieldGoal")}
          >
            Away Field Goal
          </button>
        </div>
        <div className="bottomButtons">
          <button
            className="downButton"
            onClick={() => setDown(down < 4 ? down + 1 : down - 3)}
          >
            Change Downs
          </button>
          <button
            className="quarterButton"
            onClick={() => setQuarter(quarter < 4 ? quarter + 1 : quarter - 3)}
          >
            Change Quarter
          </button>
          <button className="quarterButton"onClick={(event) => toggle(event)}>
            Timer
          </button>
          <button className="quarterButton"onClick={(event) => reset(event)}>
            Reset timer
          </button>
        </div>
        <div className="bottomInputs">
          <h3>Change Yards to Go</h3>
          <form onSubmit={(event) => handleSubmit(event)}>
          <input
            className="yardsToGo"
            type="number"
            placeholder={yardsToGo}
          />
          </form>
          <h3>Change Ball On</h3>
          <form onSubmit={(event) => handleSubmit(event)}>
          <input
            className="ballOn" 
            placeholder={ballOn}
          />
          </form>
        </div>
      </section>
    </div>
  );
}

export default App;


/* {
          if(seconds === 0) {
            seconds = 9;
            if(tenSeconds === 0){
              setTenSeconds(5);
                if(minutes <= 10) {
                   setMinutes('0' + (minutes - 1))
                   return minutes;
                } else {
                  setMinutes(minutes - 1)
                  return minutes;
                }
            } else {
              setTenSeconds(tenSeconds - 1)
            }
          return seconds;
          } else {
            return seconds = seconds - 1;
          }*/