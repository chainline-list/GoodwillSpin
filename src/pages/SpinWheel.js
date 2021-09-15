import React, { useState } from 'react';

function SpinWheel({ walletAddress, wheelBlockchain }) {
  const [name, setName] = useState("circle");

  const startRotation = () => {
    setName("circle start-rotate");
    setTimeout(() => {
      earnToken();
      setName("circle start-rotate stop-rotate");
    }, 1900)
  }

  const earnToken = async () => {
    const data = await wheelBlockchain.methods
      .sendToken()
      .send({ from: walletAddress });

    console.log(data);
  }

  return (
    <div className="wheel">
      <div className="arrow"></div>
      <ul className={name}>
        <li>
          <div className="text">
            1
          </div>
        </li>
        <li>
          <div className="text">
            2
          </div>
        </li>
        <li>
          <div className="text">
            3
          </div>
        </li>
        <li>
          <div className="text">
            4
          </div>
        </li>
        <li>
          <div className="text">
            5
          </div>
        </li>
        <li>
          <div className="text">
            6
          </div>
        </li>
        <li>
          <div className="text">
            7
          </div>
        </li>
        <li>
          <div className="text">
            8
          </div>
        </li>
        <li>
          <div className="text">
            9
          </div>
        </li>
        <li>
          <div className="text">
            10
          </div>
        </li>
        <li>
          <div className="text">
            11
          </div>
        </li>
        <li>
          <div className="text">
            12
          </div>
        </li>
      </ul>
      {wheelBlockchain && <button className="spin-button" onClick={startRotation}>
        SPIN
      </button>}
    </div>
  )
}

export default SpinWheel;
