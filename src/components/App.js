import React, { useState, useEffect, useRef } from "react";

function App() {
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const [isRunning, setIsRunning] = useState(false);


  const intervalRef = useRef(null);


  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 10); 
    }
  };


  const handleStop = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  };

  const handleLap = () => {
    if (isRunning) {
      setLaps([...laps, time]);
    }
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);


  const formatTime = (centiseconds) => {
    const minutes = Math.floor(centiseconds / 6000);
    const seconds = Math.floor((centiseconds % 6000) / 100);
    const cs = centiseconds % 100;
    return `${pad(minutes)}:${pad(seconds)}.${pad(cs)}`;
  };
  const pad = (num) => (num < 10 ? "0" + num : num);

  return (
    <div>
      <h2>Lap Timer</h2>
      <h1>{formatTime(time)}</h1>
      <div>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleLap}>Lap</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      <h3>Laps</h3>
      <ul>
        {laps.map((lapTime, index) => (
          <li key={index}>
            Lap {index + 1}: {formatTime(lapTime)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
