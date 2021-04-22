const projectName = 'Productivity Timer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTimer: 'Session',
      sessionLength: 25,
      breakLength: 5,
      timerActive: false,
      timer: 1500,
      icon: 'fas fa-play-circle',
      startStop: 'Start',
      intervalID: '',
    };
    this.handleReset = this.handleReset.bind(this);
    this.handleSessionChange = this.handleSessionChange.bind(this);
    this.handleBreakChange = this.handleBreakChange.bind(this);
    this.showTime = this.showTime.bind(this);
    this.countdown = this.countdown.bind(this);
    this.timerControl = this.timerControl.bind(this);
  }
  
  handleReset() {
    clearInterval(this.state.intervalID);
    this.setState({
      currentTimer: 'Session',
      timerActive: false,
      breakLength: 5,
      sessionLength: 25,
      timer: 1500,
      icon: 'fas fa-play-circle',
      startStop: 'Start',
      intervalID: '',
    });
    this.alarm.pause();
    this.alarm.currentTime = 0;
  }
  
  handleSessionChange(e) {
    if (this.state.timerActive) return null;
    if (this.state.currentTimer == 'Session') {
      if (this.state.sessionLength != 60 && e.currentTarget.value == '+') {
        this.setState({
          sessionLength: this.state.sessionLength + 1,
          timer: this.state.sessionLength * 60 + 60,
        });
      } else if (this.state.sessionLength != 1 && e.currentTarget.value == '-') {
        this.setState({
          sessionLength: this.state.sessionLength - 1,
          timer: this.state.sessionLength * 60 - 60,
        });
      }
    } else {
      if (this.state.sessionLength != 1 && e.currentTarget.value == '-') {
        this.setState({
          sessionLength: this.state.sessionLength - 1
        });
      } else if (this.state.sessionLength != 60 && e.currentTarget.value == '+') {
        this.setState({
          sessionLength: this.state.sessionLength + 1
        });
      }
    }
  }
  
  handleBreakChange(e) {
    if (this.state.timerActive) return null;
    if (this.state.currentTimer == 'Break') {
      if (this.state.breakLength != 60 && e.currentTarget.value == '+') {
        this.setState({
          breakLength: this.state.breakLength + 1,
          timer: this.state.breakLength * 60 + 60,
        });
      } else if (this.state.breakLength != 1 && e.currentTarget.value == '-') {
        this.setState({
          breakLength: this.state.breakLength - 1,
          timer: this.state.breakLength * 60 - 60,
        });
      }
    } else {
      if (this.state.breakLength != 1 && e.currentTarget.value == '-') {
        this.setState({
          breakLength: this.state.breakLength - 1
        });
      } else if (this.state.breakLength != 60 && e.currentTarget.value == '+') {
        this.setState({
          breakLength: this.state.breakLength + 1
        });
      }
    }
  }
  
  showTime() {
    let minutes = Math.floor(this.state.timer / 60);
    let seconds = this.state.timer - minutes * 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return minutes + ':' + seconds;
  }
  
  countdown() {
    let startTime = new Date().getTime();
    let countdownTime = startTime + (this.state.timer * 1000);
    this.setState({
      intervalID: setInterval(() => {
        let now = new Date().getTime();
        let delta = countdownTime - now;
        let timerMinutes = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
        let timerSeconds = Math.floor((delta % (1000 * 60)) / 1000);
        this.setState({
          timer: (timerMinutes * 60) + timerSeconds,
        });
        if (this.state.timer == 0) {
          this.alarm.play();
        }
        if (this.state.timer < 0) {
          if (this.state.currentTimer == 'Session') {
            clearInterval(this.state.intervalID);
            this.setState({
              timer: this.state.breakLength * 60,
              currentTimer: 'Break',
            });
            this.countdown();
          } else {
            clearInterval(this.state.intervalID);
            this.setState({
              timer: this.state.sessionLength * 60,
              currentTimer: 'Session',
            });
            this.countdown();
          }
        }
      }, 1000)
    });
  }
  
  timerControl() {
    if (this.state.startStop == 'Start') {
      this.countdown();
      this.setState({
        startStop: 'Stop',
        icon: 'fas fa-pause-circle',
        timerActive: true,
      });
    } else {
      clearInterval(this.state.intervalID);
      this.setState({
        startStop: 'Start',
        icon: 'fas fa-play-circle',
        timerActive: false,
      });
    }
  }
  
  render() {
    return(
      <>
        <p className="title">Pomodoro Timer</p>
        <div className="adjust-wrapper">
          <Session sessionLength={this.state.sessionLength} change={this.handleSessionChange} />
          <Break breakLength={this.state.breakLength} change={this.handleBreakChange} />
        </div>
        <Timer 
          currentTimer={this.state.currentTimer} 
          showTime={this.showTime()} 
          icon={this.state.icon} 
          reset={this.handleReset}
          timerControl={this.timerControl} />
        <audio
          id="beep"
          preload="auto"
          src="https://actions.google.com/sounds/v1/alarms/radiation_meter.ogg"
          ref={(audio) => {
            this.alarm = audio;
          }} />
      </>
    );
  }
}

const Session = (props) => {
  return (
    <div className="session-wrapper">
      <div id="session-label" className="label">Session</div>
      <div className="changer">
        <button id="session-decrement" className="changeBtn" onClick={props.change} value="-"><i className="fas fa-sort-down"></i></button>
        <span id="session-length" className="lengthDisplay">{props.sessionLength}</span>
        <button id="session-increment" className="changeBtn" onClick={props.change} value="+"><i className="fas fa-sort-up"></i></button>
      </div>
    </div>
  );
}

const Break = (props) => {
  return (
    <div className="break-wrapper">
      <div id="break-label" className="label">Break</div>
      <div className="changer">
        <button id="break-decrement" className="changeBtn" onClick={props.change} value="-"><i className="fas fa-sort-down"></i></button>
        <span id="break-length" className="lengthDisplay">{props.breakLength}</span>
        <button id="break-increment" className="changeBtn" onClick={props.change} value="+"><i className="fas fa-sort-up"></i></button>
      </div>
    </div>
  );
}

const Timer = (props) => {
  return (
    <div>
      <div className="timerDisplay">
        <div id="timer-label">{props.currentTimer}</div>
        <div id="time-left">{props.showTime}</div>
      </div>
      <div className="control-btns">
        <button id="start_stop" onClick={props.timerControl}><i className={props.icon}></i></button>
        <button id="reset" onClick={props.reset}><i className="fas fa-redo-alt"></i></button>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));