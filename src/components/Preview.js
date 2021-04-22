import React from 'react'

const Preview = (props) => {
    return (
        <div>
            <div id='timer-label'><b>{props.isOnBreak ? 'Break' : 'Session'}</b></div>
            <div id='time-left'>{props.isOnBreak ? props.breakLength : props.sessionLength}</div>
        </div>
    )
}

export default Preview
