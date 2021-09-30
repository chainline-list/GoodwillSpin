import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Divider, List, Card } from 'antd';

import PrizePoolCard from '../components/PrizePoolCard';
import DonationFormCard from '../components/DonationFormCard';
import Wheel from '../components/Wheel';
import PrizeInformationCard from '../components/PrizeInformationCard';
import ResultModal from '../components/ResultModal';

function SpinWheel({ walletAddress, wheelBlockchain, tokenBlockchain, isLoggedIn, magicHarmony }) {
  const [wheelclass, setWheelclass] = useState("box");
  const [oneBalance, setOneBalance] = useState(0);
  const [oneToUSDBalance, setOneToUSDBalance] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [donationTotal, setDonationTotal] = useState(0);
  const [poolPrize, setPoolPrize] = useState(0);
  const [awardedWon, setAwardedWon] = useState(0);
  const [wonOne, setWonOne] = useState(0);
  const [usedTickets, setUsedTickets] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [result, setResult] = useState('');

  const getONEtoUSD = async ONEvalue => {
    const usdValue = await wheelBlockchain.methods
        .getThePrice()
        .call();

        console.log(usdValue)

    let totalUSDValue = (usdValue * ONEvalue) / 10 ** 26;
    totalUSDValue = Number.parseFloat(totalUSDValue).toFixed(2);
    return totalUSDValue;
  }

  useEffect(() => {
    const getPoolPrizeInfo = async () => {
      const donation = await wheelBlockchain.methods
        .totalDonation()
        .call();
      setDonationTotal(await getONEtoUSD(donation));
      const prize = await wheelBlockchain.methods
        .prizePool()
        .call();
      setPoolPrize(await getONEtoUSD(prize));
      const award = await wheelBlockchain.methods
        .prizePoolWon()
        .call();
      setAwardedWon(await getONEtoUSD(award));
      
      if(window.web3.eth){
        const balance = await window.web3.eth.getBalance(walletAddress);
        setOneBalance(balance);
        setOneToUSDBalance(await getONEtoUSD(balance));
      }
    }

    if(wheelBlockchain) getPoolPrizeInfo();
  }, [wheelBlockchain, walletAddress])

  useEffect(() => {
    const getTicketToken = async () => {
      const amount = await tokenBlockchain.methods
        .balanceOf(walletAddress)
        .call();
      setTokenBalance(amount);
    }

    if(tokenBlockchain) getTicketToken();
  }, [tokenBlockchain, walletAddress])

  const startRotation = (wheelNumber) => {
    setWheelclass("box start-rotate");
    setTimeout(async () => {
      setWheelclass("box start-rotate stop-rotate");
      setIsModalVisible(true);

      const donation = await wheelBlockchain.methods
        .totalDonation()
        .call();
      setDonationTotal(await getONEtoUSD(donation));
      const prize = await wheelBlockchain.methods
        .prizePool()
        .call();
      setPoolPrize(await getONEtoUSD(prize));
      const award = await wheelBlockchain.methods
        .prizePoolWon()
        .call();
      setAwardedWon(await getONEtoUSD(award));

      const amount = await tokenBlockchain.methods
        .balanceOf(walletAddress)
        .call();
      setTokenBalance(amount);

      if(window.web3.eth){
        const balance = await window.web3.eth.getBalance(walletAddress);
        setOneBalance(balance);
        setOneToUSDBalance(await getONEtoUSD(balance));
      }
    }, (1000 + (125 * +wheelNumber)))
  }

  const buyToken = async (userAmount) => {
    if(isLoggedIn){
      const tx = await wheelBlockchain.methods.buyTicketTokens();
      console.log(tx);

      let { txPayload } = tx.transaction;
      txPayload.from = walletAddress;
      txPayload.value = (userAmount * 10 ** 18).toString();
      txPayload.gasLimit = '210000';
      txPayload.gasPrice = '1000000000';

      console.log(txPayload);
      const txn = await magicHarmony.harmony.sendTransaction(txPayload);
      console.log('call contract', txn);
    }
    else{
      const data = await wheelBlockchain.methods
        .buyTicketTokens()
        .send({ from: walletAddress, value: window.web3.utils.toWei(userAmount, 'Ether')});
      console.log(data);
    }
    
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

    if(window.web3.eth){
      const balance = await window.web3.eth.getBalance(walletAddress);
      setOneBalance(balance);
    }
  }

  const earnToken = async () => {
    if(isLoggedIn){
      const tx = await wheelBlockchain.methods.useTicketToken();
      console.log(tx);

      let { txPayload } = tx.transaction;
      txPayload.from = walletAddress;
      txPayload.gasLimit = '210000';
      txPayload.gasPrice = '1000000000';

      console.log(txPayload);
      const txn = await magicHarmony.harmony.sendTransaction(txPayload);
      console.log('call contract', txn);
      setUsedTickets(usedTickets + 1);
      startRotation(0);
    }
    else{
      const data = await wheelBlockchain.methods
        .useTicketToken()
        .send({ from: walletAddress });

      console.log(data);
      console.log(data.events.WonWheel.returnValues.randomNumber);
      setUsedTickets(usedTickets + 1);
      setWonOne(wonOne + +data.events.WonWheel.returnValues.amount);
      setResult(data.events.WonWheel.returnValues.result);
      startRotation(data.events.WonWheel.returnValues.wheelNumber);
    }
  }

  return (
    <div>
      {wheelBlockchain 
        ? <PrizePoolCard
        donationTotal={donationTotal}
        poolPrize={poolPrize}
        awardedWon={awardedWon} />
        : <Card>
            <Typography.Title style={{ marginBottom: '0', textAlign: 'center', color: 'red'}}>
              Connect to your wallet to see the prize pool
            </Typography.Title>
          </Card>
      }
      <DonationFormCard
        buyToken={buyToken}
        oneBalance={oneBalance}
        oneToUSDBalance={oneToUSDBalance}
        wheelBlockchain={wheelBlockchain} />

      <Typography.Title style={{ marginTop: '1rem', textAlign: 'center'}}>
        Wheel of Goodwill
      </Typography.Title>
      <Row gutter={16}>
        <Col className="gutter-row" xs={{ span: 24 }} sm={{ span: 12 }}>
          <Wheel
            wheelclass={wheelclass}
            earnToken={earnToken}
            wheelBlockchain={wheelBlockchain} />
        </Col>
        <Col className="gutter-row" xs={{ span: 24 }} sm={{ span: 12 }}>
          <Typography.Title level={2}>
            Your Spin Tickets: {tokenBalance / 10 ** 18}
          </Typography.Title >
          
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
                  title={`Spin Tickets : ${usedTickets}`}
                />
              </List.Item>
          </List>

          <Divider orientation="left">Prize Information</Divider>
          <PrizeInformationCard />
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
