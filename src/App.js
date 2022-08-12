
import { useState, useEffect } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Timer from './timer/Timer';
import { pad } from './timer/utils'
import "./timer/styles.css";

function App() {
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(null);
  const [startTime, setStartTime] = useState(0);
  const [resetCount, setResetCount] = useState(0);
  const [startTimeControl, setStartTimeControl] = useState('');

  const minSecToSeconds = (time) => {
    const [minutes, seconds] = time.split(":");
    let totalSeconds = (parseInt(minutes || 0) * 60) + parseInt(seconds || 0)
    return totalSeconds;
  }
  const minuteSeconds = (time) => {
    var minutes = Math.floor(time / 60);
    var seconds = time - minutes * 60;

    return pad(minutes) + ':' + pad(seconds);
  }
  const stopTimer = () => {
    timer.stop()
  }

  const resetTimer = () => {
    const interval = setTimeout(() => {
      setResetCount(0);
    }, 500)

    if (resetCount > 0) {
      setResetCount(0)
      setStartTimeControl('')
      setStartTime(0);
      clearTimeout(interval);
    } else {
      setResetCount(resetCount => resetCount + 1)
    }

    timer.reset();
  }

  const handleStartTimeChange = (text) => {
    setStartTimeControl(text);
  }
  const runTimer = () => {
    timer.start();
    setInterval(() => {
      const timeInSeconds = Math.round(timer.getTime() / 1000);
      setTime(timeInSeconds);
    }, 100)
  }

  useEffect(() => {
    const timer = new Timer();
    setTimer(timer)
    return () => setTimer(null);
  }, [])

  return (
    <Row className="vh-100">
      <Col className='col-auto ms-4 pt-4'>
        <InputGroup className="mb-0">
          {/* <InputGroup.Text id="basic-addon1">x</InputGroup.Text> */}
          <Form.Control
            placeholder="00:00"
            aria-label="Start time"
            title="Start time"
            htmlSize={5}
            maxLength={5}
            as="input"
            size="sm"
            value={startTimeControl}
            style={{ maxWidth: "4.5em" }}
            aria-describedby="basic-addon1"
            onChange={(e) => {
              setStartTime(minSecToSeconds(e.target.value))
              handleStartTimeChange(e.target.value);
            }}
          />
        </InputGroup>
      </Col>
      <Col className="pt-4 align-items-center allowDrag px-auto"
        style={{
          maxWidth: "3.3em",
          width: "3.3em",
          fontSize: '28pt',
          lineHeight: '22pt'
        }}>
        {minuteSeconds(time + startTime)}
      </Col>
      <Col className="col-auto pt-4">
        <Button size="sm" variant="success" onClick={() => runTimer()}>
          <i className="bi bi-play"></i>{' '}Start
        </Button>
      </Col>
      <Col className="col-auto pt-4">
        <Button size="sm" variant="danger" onClick={() => stopTimer()}>
          <i className="bi bi-stop"></i>{' '}
          Stop
        </Button>
      </Col>
      <Col className="col-auto pt-4">
        <Button size="sm" variant="warning" onClick={() => resetTimer()}>
          <i className="bi bi-arrow-counterclockwise"></i>{' '}
          Reset</Button>
      </Col>
    </Row >
  );
}

export default App;
