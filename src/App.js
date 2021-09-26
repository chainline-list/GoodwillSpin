import React, { useEffect, useState } from 'react';
import { HashRouter, Switch, Route  } from 'react-router-dom';
import { Layout } from 'antd';
import Web3 from 'web3';
import { Magic } from 'magic-sdk';
import { HarmonyExtension } from '@magic-ext/harmony';

import { MAGICAPIKEY } from './config';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import SpinWheel from './pages/SpinWheel';
import Login from './pages/Login';
import TokenBlockchain from './abis/Token.json';
import WheelBlockchain from './abis/Wheel.json';

const { Harmony: Index } = require('@harmony-js/core');
const { ChainID, ChainType } = require('@harmony-js/utils');

const magic = new Magic(MAGICAPIKEY, {
  extensions: [
    new HarmonyExtension({
      rpcUrl: 'https://api.s0.b.hmny.io',
      chainId: ChainID.HmyTestnet,
    }),
  ],
});

const harmony = new Index(
  // rpc url
  'https://api.s0.b.hmny.io',
  {
    // chainType set to Index
    chainType: ChainType.Harmony,
    // chainType set to HmyLocal
    chainId: ChainID.HmyTestnet,
  },
);

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [wheelBlockchain, setWheelBlockchain] = useState(null);
  const [tokenBlockchain, setTokenBlockchain] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userMetadata, setUserMetadata] = useState({});
  const [magicHarmony] = useState(magic);

  useEffect(() => {
    magic.user.isLoggedIn().then(async magicIsLoggedIn => {
      setIsLoggedIn(magicIsLoggedIn);
      if (magicIsLoggedIn) {
        const { publicAddress } = await magic.user.getMetadata();
        setWalletAddress(publicAddress);
        setUserMetadata(await magic.user.getMetadata());
        await connetToBlockchainWithMagic();
      }
    });
  }, [isLoggedIn]);

  const connetToWallet = async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);

        await window.ethereum.enable();
        await connetToBlockchainWithWallet();
    }
    else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        await connetToBlockchainWithWallet();
    }
    else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }
  
  const connetToBlockchainWithWallet = async () => {
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
    } else {
        window.alert('Contract is not deployed to detected network')
    }
  }

  const connetToBlockchainWithMagic = async () => {
    const wheelContract = harmony.contracts.createContract(WheelBlockchain.abi, WheelBlockchain.networks['1666700000'].address);
    setWheelBlockchain(wheelContract);

    const tokenContract = harmony.contracts.createContract(TokenBlockchain.abi, TokenBlockchain.networks['1666700000'].address);
    setTokenBlockchain(tokenContract);
  }

  const loginWithMagic = async (email) => {
    await magic.auth.loginWithMagicLink({ email });
    const { publicAddress } = await magic.user.getMetadata();
    setWalletAddress(publicAddress);
    setUserMetadata(await magic.user.getMetadata());
    await connetToBlockchainWithMagic();
    setIsLoggedIn(true);
  };

  const logoutOfMagic = async () => {
    await magic.user.logout();
    setWheelBlockchain(null);
    setTokenBlockchain(null);
    setWalletAddress('');
    setIsLoggedIn(false);
  };

  console.log(walletAddress, userMetadata);

  return (
    <HashRouter>
      <Layout className="App">
        <Navbar
          connetToWallet={connetToWallet}
          walletAddress={walletAddress}
          logoutOfMagic={logoutOfMagic}
          isLoggedIn={isLoggedIn} />
        <Layout>
          <Layout.Sider width={180} className="site-layout-background"> 
            <Sidebar />
          </Layout.Sider>
          <Layout style={{ padding: '0 24px 24px', minHeight: '92vh' }}>
            <Layout.Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Switch>
                <Route path="/login">
                  <Login loginWithMagic={loginWithMagic} />
                </Route>
                <Route path="/">
                  <SpinWheel
                    walletAddress={walletAddress}
                    wheelBlockchain={wheelBlockchain}
                    tokenBlockchain={tokenBlockchain}
                    isLoggedIn={isLoggedIn}
                    magicHarmony={magicHarmony} />
                </Route>
              </Switch>
            </Layout.Content>
          </Layout>
        </Layout>
      </Layout>
    </HashRouter>
  );
}

export default App;
