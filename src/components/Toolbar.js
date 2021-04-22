import React from 'react'
import { Row, Col } from 'react-bootstrap'
import {FaStopCircle, FaPlayCircle, FaPauseCircle } from 'react-icons/fa'
import { IoMdRefreshCircle } from 'react-icons/io'


const Toolbar = (props) => {

    return (
        <div className="toolbar">
            <Row>
                <Col>
                    <span className='btn btn-toolbar' onClick={props.handleStop} >
                        <FaStopCircle size='40px' />
                    </span>
                </Col>
                <Col>
                    <span id='start_stop' className='btn btn-toolbar' onClick={props.handlePlayPause} > 
                        {props.isRunning ? <FaPauseCircle size='40px' /> : <FaPlayCircle size='40px' />}
                    </span>     
                </Col>
                <Col>
                    <span id ='reset' className='btn btn-toolbar' onClick={props.handleRefresh} > 
                        <IoMdRefreshCircle size='40px' /> 
                    </span>
                </Col>
            </Row>
        </div>
    )
}

export default Toolbar
