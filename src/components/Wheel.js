import React from 'react';
import {
  DeleteOutlined,
  CopyOutlined,
  DollarCircleOutlined
} from '@ant-design/icons'

function Wheel({ wheelclass, earnToken, wheelBlockchain }) {
  return (
    <div className="wheel">
      <div className="mainbox">
        <div className="arrow"></div>
        
        <div className={wheelclass}>
          <div className="box1">
            <span className="span1">
              <DollarCircleOutlined className="icon"/><b>25% Prize</b>
            </span>
            <span className="span2">
              <DollarCircleOutlined className="icon"/><b>10% Prize</b>
            </span>
            <span className="span3">
              <CopyOutlined className="icon" /><b>5 Tickets</b>
            </span>
            <span className="span4">
              <DeleteOutlined className="icon" /><b>Nothing</b>
            </span>
          </div>
          <div className="box2">
            <span className="span1">
              <DollarCircleOutlined className="icon"/><b>15% Prize</b>
            </span>
            <span className="span2">
              <DollarCircleOutlined className="icon"/><b>50% Prize</b>
            </span>
            <span className="span3">
              <DollarCircleOutlined className="icon"/><b>5% Prize</b>
            </span>
            <span className="span4">
              <CopyOutlined className="icon" /><b>10 Tickets</b>
            </span>
          </div>
        </div>
        { wheelBlockchain && 
          <button className="spin" onClick={earnToken}>SPIN</button>
        }
      </div>
    </div>
    
  )
}

export default Wheel;
