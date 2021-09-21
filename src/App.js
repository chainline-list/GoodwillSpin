import React, { useState } from 'react';
import { Layout, Card, Statistic } from 'antd';
import Web3 from 'web3';

import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import SpinWheel from './pages/SpinWheel';
import TokenBlockchain from './abis/Token.json';
import WheelBlockchain from './abis/Wheel.json';

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [wheelBlockchain, setWheelBlockchain] = useState(null);
  const [tokenBlockchain, setTokenBlockchain] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [poolPrize, setPoolPrize] = useState(0);

  const connetToWallet = async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);

        await window.ethereum.enable();
    }
    else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    setWalletAddress(accounts[0]);

    const networkId = await web3.eth.net.getId();
    const networkData = WheelBlockchain.networks[networkId];

    if(networkData){
        const abi = WheelBlockchain.abi;
        const address = WheelBlockchain.networks[networkId].address;

        const wheelContract = new web3.eth.Contract(abi, address);
        setWheelBlockchain(wheelContract);

        const tokenContract = new web3.eth.Contract(TokenBlockchain.abi, TokenBlockchain.networks[networkId].address);
        setTokenBlockchain(tokenContract);

        const amount = await tokenContract.methods
          .balanceOf(accounts[0])
          .call();
        setTokenBalance(amount);

        const pool = await wheelContract.methods
          .getPrizePool()
          .call();
        setPoolPrize(pool);
    } else {
        window.alert('Contract is not deployed to detected network')
    }
  }

  return (
    <Layout className="App">
      <Navbar connetToWallet={connetToWallet} walletAddress={walletAddress} />
      <Layout>
        <Layout.Sider width={180} className="site-layout-background"> 
          <Sidebar />
        </Layout.Sider>
        <Layout style={{ padding: '0 24px 24px', height: '92vh' }}>
          <Layout.Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Card>
              <Statistic title="Total Pool Prize" value={`${poolPrize / 10 ** 18} One`} />
            </Card>
            <SpinWheel
              walletAddress={walletAddress}
              wheelBlockchain={wheelBlockchain}
              tokenBalance={tokenBalance} />
          </Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
