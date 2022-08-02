
import { useState, useEffect } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Timer from './timer/Timer';
import { pad } from './timer/utils'
import "./timer/styles.css";

function App() {
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState();
  const [startTime, setStartTime] = useState(0);

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
    timer.reset();
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
    <Row style={{ marginTop: "38px" }}>
      <Col className='col-auto ms-4'>

        <InputGroup className="mb-0">
          {/* <InputGroup.Text id="basic-addon1">x</InputGroup.Text> */}
          <Form.Control
            placeholder="00:00"
            aria-label="Start time"
            title="Start time"
            htmlSize={5}
            aria-describedby="basic-addon1"
            onChange={(e) => { setStartTime(minSecToSeconds(e.target.value)) }}
          />
        </InputGroup>
      </Col>
      <div className="d-flex align-items-center allowDrag" style={{
        width: "3.5em",
        fontSize: '28pt',
        lineHeight: '28pt'
      }}>
        {minuteSeconds(time + startTime)}
      </div>
      <Col className="col-auto">
        <Button variant="success" onClick={() => runTimer()}>
          <i className="bi bi-play"></i>{' '}Start
        </Button>
      </Col>
      <Col className="col-auto">
        <Button variant="danger" onClick={() => stopTimer()}>
          <i className="bi bi-stop"></i>{' '}
          Stop
        </Button>
      </Col>
      <Col className="col-auto">
        <Button variant="warning" onClick={() => resetTimer()}>
          <i className="bi bi-arrow-counterclockwise"></i>{' '}
          Reset</Button>
      </Col>
    </Row >
  );
}

export default App;
