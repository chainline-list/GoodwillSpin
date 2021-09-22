import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Button, Divider, List } from 'antd';

import PrizePoolCard from '../components/PrizePoolCard';
import ResultModal from '../components/ResultModal';

function SpinWheel({ walletAddress, wheelBlockchain, tokenBlockchain }) {
  const [name, setName] = useState("circle");
  const [tokenBalance, setTokenBalance] = useState(0);
  const [donationTotal, setDonationTotal] = useState(0);
  const [poolPrize, setPoolPrize] = useState(0);
  const [awardedWon, setAwardedWon] = useState(0);
  const [wonOne, setWonOne] = useState(0);
  const [usedTickets, setUsedTickets] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [result, setResult] = useState('');

  useEffect(() => {
    const getPoolPrizeInfo = async () => {
      const donation = await wheelBlockchain.methods
        .totalDonation()
        .call();
        setDonationTotal(donation);
      const prize = await wheelBlockchain.methods
        .prizePool()
        .call();
      setPoolPrize(prize);
      const award = await wheelBlockchain.methods
        .prizePoolWon()
        .call();
        setAwardedWon(award);
    }

    if(wheelBlockchain) getPoolPrizeInfo();
  }, [wheelBlockchain])

  useEffect(() => {
    const getTicketToken = async () => {
      const amount = await tokenBlockchain.methods
        .balanceOf(walletAddress)
        .call();
      setTokenBalance(amount);
    }

    if(tokenBlockchain) getTicketToken();
  }, [tokenBlockchain])

  const startRotation = (randomNumber) => {
    setName("circle start-rotate");
    setTimeout(async () => {
      setName("circle start-rotate stop-rotate");
      setIsModalVisible(true);

      const donation = await wheelBlockchain.methods
        .totalDonation()
        .call();
        setDonationTotal(donation);
      const prize = await wheelBlockchain.methods
        .prizePool()
        .call();
      setPoolPrize(prize);
      const award = await wheelBlockchain.methods
        .prizePoolWon()
        .call();
        setAwardedWon(award);
      const amount = await tokenBlockchain.methods
        .balanceOf(walletAddress)
        .call();
      setTokenBalance(amount);

    }, (1000 + (10 * +randomNumber)))
  }

  const buyToken = async () => {
    const data = await wheelBlockchain.methods
      .buyTicketTokens()
      .send({ from: walletAddress, value: window.web3.utils.toWei("2", 'Ether')});
    console.log(data);
    const donation = await wheelBlockchain.methods
      .totalDonation()
      .call();
      setDonationTotal(donation);
    const prize = await wheelBlockchain.methods
      .prizePool()
      .call();
    setPoolPrize(prize);
    const amount = await tokenBlockchain.methods
      .balanceOf(walletAddress)
      .call();
    setTokenBalance(amount);
  }

  const earnToken = async () => {
    const data = await wheelBlockchain.methods
      .useTicketToken()
      .send({ from: walletAddress });

    console.log(data);
    console.log(data.events.WonWheel.returnValues.randomNumber);
    setUsedTickets(usedTickets + 1);
    setWonOne(wonOne + +data.events.WonWheel.returnValues.amount);
    setResult(data.events.WonWheel.returnValues.result);
    startRotation(data.events.WonWheel.returnValues.randomNumber);
  }

  return (
    <div>
      <PrizePoolCard
        donationTotal={donationTotal}
        poolPrize={poolPrize}
        awardedWon={awardedWon} />
      <Typography.Title style={{ marginTop: '1rem', marginBottom: '.5rem'}}>
        Wheel of Goodwill
      </Typography.Title>
      <p style={{ marginBottom: '2.5rem'}}>For every One Token donated to charities, you receive one ticket to spin the wheel of goodwill.</p>
      <Row gutter={16}>
        <Col className="gutter-row" sm={{ span: 24 }} md={{ span: 12 }}>
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
        <Col className="gutter-row" sm={{ span: 24 }} md={{ span: 12 }}>
          <Button type="secondary" onClick={buyToken}>
            Buy Tokens
          </Button>
          <Typography.Title level={2}>
            Your Spin Tickets: {tokenBalance / 10 ** 18}
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

      <ResultModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        result={result} />
    </div>
  )
}

export default SpinWheel;
