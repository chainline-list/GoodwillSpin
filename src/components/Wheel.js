import React from 'react';

function Wheel({ wheelclass, earnToken, wheelBlockchain }) {
  return (
    <div className="wheel">
      <div className="mainbox">
        <div className="arrow"></div>
        
        <div className={wheelclass}>
          <div className="box1">
            <span className="span1"><b>2</b></span>
            <span className="span2"><b>4</b></span>
            <span className="span3"><b>6</b></span>
            <span className="span4"><b>8</b></span>
          </div>
          <div className="box2">
            <span className="span1"><b>1</b></span>
            <span className="span2"><b>3</b></span>
            <span className="span3"><b>5</b></span>
            <span className="span4"><b>7</b></span>
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
