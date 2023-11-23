import { useEffect, useState } from "react";

const defaultState = {
  millis: "00",
  secs: "00",
  mins: "00",
  hours: "00",
};

let startDuration = null;

function getZeroAppendedString(num) {
  //   console.log(num);
  // if(!parseInt(num)){
  //     // console.log('something went wrong while parsing the number');
  //     return;
  // }
  let returnValue = ("0" + num).slice(-2);
  return returnValue;
}

function calculateTime() {
  let millisecondsPassed = new Date().getTime() - startDuration;
  let millisecondsTimer = getZeroAppendedString(
    String(millisecondsPassed % 1000).substring(0, 2)
  );
  let secondsPassed = Math.floor(millisecondsPassed / 1000);
  let secondsPassedTimer = Math.floor(millisecondsPassed / 1000) % 60;
  let minutesPassed = Math.floor(secondsPassed / 60);
  let minutesPassedTimer = Math.floor(secondsPassed / 60) % 60;
  // let hoursPassedTimer = Math.floor(minutesPassed / 60);
  let hoursPassed = Math.floor(minutesPassed / 60) % 24;

  secondsPassed = getZeroAppendedString(secondsPassedTimer);
  minutesPassed = getZeroAppendedString(minutesPassedTimer);
  hoursPassed = getZeroAppendedString(hoursPassed);

  // console.log(`Time ${hoursPassed}:${minutesPassed}:${secondsPassedTimer}:${millisecondsTimer}`
  // );
  return {
    millis: millisecondsTimer,
    secs: secondsPassed,
    hours: hoursPassed,
    mins: minutesPassed,
  };
}

export default function Stopwatch() {
  let [timer, setTimer] = useState({
    millis: "00",
    secs: "00",
    mins: "00",
    hours: "00",
  });

  let [isStarted, setIsStarted] = useState(false);
  let [interval, _setInterval] = useState(null);
  let [elapsedTime, setElapsedTime] = useState(0);
  useEffect(() => {
    // setTimeout(()=>{
    //     setTimer({
    //         millis:'10',
    //         secs:'02',
    //         mins: '10',
    //         hours:'00'
    //     }, 1000);
    // })
    // _setInterval(
    //   setInterval(() => {
    //     setTimer(calculateTime());
    //   }, 20)
    // );

    return () => {
      if (interval) {
        clearInterval(interval);
        _setInterval(null);
      }
    };
  }, []);

  //   function startTimer() {
  //       if (!isStarted) {
  //         startDuration = new Date().getTime();
  //         _setInterval(
  //           setInterval(() => {
  //             setTimer(calculateTime());
  //           }, 20)
  //         );
  //       }
  //       setIsStarted((bIsStarted) => !bIsStarted);
  //   }
  function startTimer() {
    if (!isStarted) {
      // Start the timer
      startDuration = new Date().getTime() - elapsedTime;
      const newInterval = setInterval(() => {
        setTimer(calculateTime());
      }, 20);
      _setInterval(newInterval);
    } else {
      // Stop the timer
      setElapsedTime(new Date().getTime() - startDuration);
      clearInterval(interval);
      setInterval(null);
    }
    setIsStarted(!isStarted);
  }

  function resetTimer() {
    setTimer(defaultState);
    setIsStarted(false);
    clearInterval(interval);
    _setInterval(null);
    setElapsedTime(0);
    startDuration = null;
  }
  return (
    <div className="container">
      <div className="clock">
        <div className="heading-bar">
          <span>Stopwatch</span>

          <div className="icon">s</div>
        </div>
        <div className="timer-container">
          <div className="timer">
            {timer.hours}:{timer.mins}:{timer.secs}:{timer.millis}
          </div>
        </div>
        <div className="spacer" />
        <div className="button-container">
          <div
            onClick={startTimer}
            className={`button ${isStarted ? "active" : ""}`}
          >
            {isStarted ? "Stop" : "Start"}
          </div>
          <div onClick={resetTimer} className="button">
            Reset
          </div>
        </div>
      </div>
    </div>
  );
}
