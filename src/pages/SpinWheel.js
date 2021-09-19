import React, { useState } from 'react';

function SpinWheel({ walletAddress, wheelBlockchain }) {
  const [name, setName] = useState("circle");

  const startRotation = () => {
    setName("circle start-rotate");
    setTimeout(() => {
      setName("circle start-rotate stop-rotate");
    }, 1900)
  }

  const buyToken = async () => {
    const data = await wheelBlockchain.methods
      .buyTicketTokens()
      .send({ from: walletAddress, value: window.web3.utils.toWei("2", 'Ether')});
    console.log(data);
  }

  const earnToken = async () => {
    const data = await wheelBlockchain.methods
      .useTicketToken()
      .send({ from: walletAddress });

    console.log(data);
    startRotation();
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
      <button onClick={buyToken}>Buy Tokens</button>
      {wheelBlockchain && <button className="spin-button" onClick={earnToken}>
        SPIN
      </button>}
    </div>
  )
}

export default SpinWheel;
