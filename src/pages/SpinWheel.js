import React, { useState } from 'react';
import { Row, Col, Typography, Button, Divider, List } from 'antd';

function SpinWheel({ walletAddress, wheelBlockchain, tokenBalance }) {
  const [name, setName] = useState("circle");
  const [wonOne, setWonOne] = useState(0);
  const [usedTickets, setUsedTickets] = useState(0);

  const startRotation = (randomNumber) => {
    setName("circle start-rotate");
    setTimeout(() => {
      setName("circle start-rotate stop-rotate");
    }, (1000 + (10 * +randomNumber)))
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
    console.log(data.events.WonWheel.returnValues.randomNumber);
    setUsedTickets(usedTickets + 1);
    setWonOne(wonOne + +data.events.WonWheel.returnValues.amount);
    startRotation(data.events.WonWheel.returnValues.randomNumber);
  }

  return (
    <div>
      <Typography.Title style={{ marginTop: '1rem', marginBottom: '.5rem'}}>
        Wheel of Goodwill
      </Typography.Title>
      <p style={{ marginBottom: '2.5rem'}}>For every One Token donated to charities, you receive one ticket to spin the wheel of goodwill.</p>
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <div className="wheel">
            <div className="arrow"></div>
            <ul className={name}>
              <li>
                <div className="text">1</div>
              </li>
              <li>
                <div className="text">2</div>
              </li>
              <li>
                <div className="text">3</div>
              </li>
              <li>
                <div className="text">4</div>
              </li>
              <li>
                <div className="text">5</div>
              </li>
              <li>
                <div className="text">6</div>
              </li>
              <li>
                <div className="text">7</div>
              </li>
              <li>
                <div className="text">8</div>
              </li>
            </ul>
          </div>
        </Col>
        <Col className="gutter-row" span={12}>
          <Button type="secondary" onClick={buyToken}>
            Buy Tokens
          </Button>
          <Typography.Title level={2}>
            Your Spin Tickets {tokenBalance / 10 ** 18}
          </Typography.Title >
          {wheelBlockchain && <Button onClick={earnToken} type="primary" size="large">
            SPIN
          </Button>}

          <Divider orientation="left">Your Winnings</Divider>
          <List
            style={{ backgroundColor: 'white'}}
            bordered
            itemLayout="horizontal">
              <List.Item>
                <List.Item.Meta
                  title={`One Tokens : ${wonOne / 10 ** 18}`}
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title={`Spin Tickes : ${usedTickets}`}
                />
              </List.Item>
          </List>
        </Col>
      </Row>
    </div>
  )
}

export default SpinWheel;
