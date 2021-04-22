import React from 'react'

const TimerSettings = (props) => {
    return (
        <div className='row'>
            <div className='length-label'>
                <span id='session-label'>
                    Session
                </span>
                <div>
                    <div id='session-increment' className='btn btn-dark' onClick={props.changeLength}> + </div>
                    <div id='session-length'>
                        {props.sessionLength}
                    </div>
                    <div id='session-decrement' className='btn btn-dark' onClick={props.changeLength}> - </div>
                </div>
            </div>
            <div className='length-label'>
                <span id='break-label'>
                    Break
                </span>
                <div>
                    <div id='break-increment' className='btn btn-dark' onClick={props.changeLength}> + </div>
                    <div id='break-length'>
                        {props.breakLength}
                    </div>
                    <div id='break-decrement' className='btn btn-dark' onClick={props.changeLength}> - </div>
                </div>
            </div>
        </div>
    )
}

export default TimerSettings
