const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Web3 = require('web3');

const giftTokenContract= require('../abis/GiftToken.json');
require('dotenv').config();

const myAddress =  process.env.YOURADDRESS;
const myPrivateKey = process.env.YOURPRIVATEKEY;

// POST /api/gift/sendemail
// Send an email
router.post('/sendemail', async (req, res, next) => {
  const email = req.body.email;
  const message = req.body.message;
  const from = req.body.from;
  const header = req.body.header;
  const redeemId = req.body.redeemId;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.YOUREMAIL,
      pass: process.env.YOUREMAILPASSWORD
    }
  });

  const mailOptions = {
    from: process.env.YOUREMAIL,
    to: email,
    subject: header,
    html: `
      <h1>From,${from}</h1>
      <p>Claim Gift Token: <a href="http://localhost:3000/#/claim/${redeemId}">${redeemId}</a></p>
      <p>${message}</p>
    `
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      return res.status(500).json({ error });
    } else {
      console.log('Email sent: ' + info.response);
      return res.status(200).json({ msg: 'Email sent: ' + info.response });
    }
  });
});

// POST /api/gift/claim
// Send Gift Token to user by calling the contract redeemTokenOnBehalf()
router.post('/claim', async (req, res, next) => {
  const redeemId = req.body.redeemId;
  const toAddress = req.body.toAddress;

  try{
    const web3 = new Web3('https://api.s0.b.hmny.io');
    const networkId = await web3.eth.net.getId();
    const myContract = new web3.eth.Contract(
      giftTokenContract.abi,
      giftTokenContract.networks[networkId].address
    );

    web3.eth.accounts.wallet.add(myPrivateKey);

    const tx = await myContract.methods.redeemTokenOnBehalf(redeemId, toAddress);
    const gas = await tx.estimateGas({from: myAddress});
    const gasPrice = await web3.eth.getGasPrice();
    const data = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(myAddress);

    const signedTx = await web3.eth.accounts.signTransaction(
      {
        to: myContract.options.address, 
        data,
        gas,
        gasPrice,
        nonce, 
        chainId: networkId
      },
      myPrivateKey
    );

    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log(`Transaction hash: ${receipt.transactionHash}`);

    return res.status(200).json({ transactionHash: receipt.transactionHash });
  }
  catch(error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

module.exports = router; 