
import { useState, useEffect } from 'react';
import './App.css';
import Timer from './timer/Timer';
function App() {
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState();
  const stopTimer = () => {
    timer.stop()
  }
  const resetTimer = () => {
    timer.reset();
  }
  const runTimer = () => {
    timer.start();

    setInterval(() => {
      const timeInSeconds = Math.round(timer.getTime() / 1000);

      setTime(timeInSeconds);
    }, 300)
  }

  useEffect(() => {
    const timer = new Timer();
    setTimer(timer)
  }, [])

  return (
    <div className="App">
      {time + 120}<br />
      <button onClick={() => runTimer()}>Start</button>
      <button onClick={() => stopTimer()}>Stop</button>
      <button onClick={() => resetTimer()}>Reset</button>
    </div>
  );
}

export default App;
