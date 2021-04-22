import React, { Component } from 'react'

import Preview from './Preview'
import TimerSettings from './TimerSettings'
import Toolbar from './Toolbar'


const initialState = {
        isRunning : false,
        sessionLength : 25,
        breakLength : 5,
        totalSeconds : 1500,
        isOnBreak : false
}

export class App extends Component {
    state = initialState;
    intervalId = 'countDown';

    componentDidMount(){
        document.addEventListener('keydown', this.handleKeyPress);
    }

    handleKeyPress = e => {
        if(e.code === 'Space') {
            this.handlePlayPause();
        }
    }


    handlePlayPause = () => {
        if(!this.state.isRunning){
            this.intervalId = setInterval(this.countDown, 1000);
        } else {
            clearInterval(this.intervalId)
        }
        this.setState({ isRunning : !this.state.isRunning });

    }
    countDown = () => {
        const updatedTotalSeconds = this.state.totalSeconds -1;
        this.setState({ totalSeconds : updatedTotalSeconds });
            if(updatedTotalSeconds < 0) {
                if(this.state.isOnBreak) {
                    document.getElementById('beep').play()
                    this.setState({
                        isOnBreak : false,
                        totalSeconds : this.state.sessionLength * 60
                    })
                } else {
                    document.getElementById('beep').play()
                    this.setState({
                        isOnBreak : true,
                        totalSeconds : this.state.breakLength * 60
                    })
                }
            }
    }

    // work on totalSeconds
    handleStop = () => {
        clearInterval(this.intervalId)
        if(this.state.isOnBreak){
            this.setState({
                isRunning : false,
                breakLength : this.state.breakLength,
                totalSeconds : this.state.breakLength * 60
            })
        } else {
            this.setState({
                isRunning : false,
                sessionLength : this.state.sessionLength,
                totalSeconds : this.state.sessionLength * 60
            })
        }
    }

    handleRefresh = () => {
        document.getElementById('beep').pause();
        document.getElementById('beep').currentTime = 0;
        clearInterval(this.intervalId)
        this.setState(initialState);
    }

    changeLength = event => {
        // be sure timer is not running
        if(!this.state.isRunning) {
            // Check the id of onClick function
            switch(event.target.id) {
                case 'session-increment' :
                    let increasedSession = this.state.sessionLength + 1;
                    this.state.sessionLength<60 && this.setState({
                        sessionLength : increasedSession,
                        totalSeconds : increasedSession * 60
                    });
                    break;
                case 'session-decrement' :
                    let decreasedSession = this.state.sessionLength - 1;
                    this.state.sessionLength>1 && this.setState({
                        sessionLength : decreasedSession,
                        totalSeconds : decreasedSession * 60
                    });
                    break;
                case 'break-increment' :
                    let increasedBreak = this.state.breakLength + 1;
                    this.state.breakLength<60 && this.setState({
                        breakLength : increasedBreak
                    });
                    break;
                case 'break-decrement' :
                    let decreasedBreak = this.state.breakLength - 1;
                    this.state.breakLength>1 && this.setState({
                        breakLength : decreasedBreak
                    });
                    break;
                default : 
                    console.log(event.target.id);
            } 
        }
    }

    renderTimer = () => {
        let minute = Math.floor(this.state.totalSeconds / 60);
        let second = this.state.totalSeconds - (minute * 60);
        if(minute<10 && minute >= 0) {
            minute = '0' + minute;
        }
        if(second<10 && second >=0) {
            second = '0' + second;
        }
        return minute + ':' + second;
    }
    
    render() {
        return (
            <div id='app-wrapper'>
                <Preview 
                    isOnBreak={this.state.isOnBreak}
                    sessionLength={this.renderTimer()} 
                    breakLength={this.renderTimer()} 
                />
                <Toolbar 
                    handleStop={this.handleStop} 
                    handlePlayPause={this.handlePlayPause} 
                    handleRefresh={this.handleRefresh} 
                    isRunning={this.state.isRunning}
                    />
                <TimerSettings 
                    sessionLength={this.state.sessionLength} 
                    breakLength={this.state.breakLength} 
                    changeLength={this.changeLength}
                />
                <audio id='beep' src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />
            </div>
        )
    }
}

export default App
