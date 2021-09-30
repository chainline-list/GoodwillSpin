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
  const recipientName = req.body.recipientName;
  const message = req.body.message;
  const name = req.body.name;
  const fromEmail = req.body.fromEmail;
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
      <body lang=EN-US link=blue vlink=purple style='tab-interval:.5in;word-wrap:
break-word'>

<div class=WordSection1>

<table class=MsoNormalTable border=0 cellspacing=0 cellpadding=0 width=600
 style='width:6.25in;mso-cellspacing:0in;mso-yfti-tbllook:1184;mso-padding-alt:
 15.0pt 15.0pt 15.0pt 15.0pt'>
 <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'>
  <td style='padding:15.0pt 15.0pt 15.0pt 15.0pt'>
  <div style='margin-bottom:15.0pt'>
  <p class=MsoNormal align=center style='text-align:center'><span
  style='font-size:12.0pt;font-family:"Helvetica",sans-serif;mso-fareast-font-family:
  "Times New Roman"'><a
  href="https://goodwillspin.netlify.app/#/"
  target="_blank"><span style='color:#6CC2A0;text-decoration:none;text-underline:
  none'><img border=0 width=300 id="_x0000_i1025"
  src="https://firebasestorage.googleapis.com/v0/b/goodwillspin-55c9b.appspot.com/o/goodwill%20spin%20logo.jpg?alt=media&token=1c09d729-fab2-4dc8-afb2-7f6fcacc0607"
  alt="Goodwill Spin, a better gift a better world"></span></a><o:p></o:p></span></p>
  </div>
  </td>
 </tr>
   
   <tr style='mso-yfti-irow:2'>
    <td style='padding:.75pt .75pt .75pt .75pt'>
    <div style='margin-bottom:15.0pt'>
    <p class=MsoNormal align=center style='text-align:center'><span
    style='mso-fareast-font-family:"Times New Roman";text-decoration:none'><a
    href="https://goodwillspin.netlify.app/#/claim/${redeemId}"
    target="_blank"><span style='font-size:16.5pt;color:white;border:solid #6CC2A0 6.0pt;
    padding:0in;background:#6CC2A0;text-decoration:none;text-underline:none'>Claim Your Goodwill Gift Tokens</span></a> <o:p></o:p></span></p>
    </div>
    </td>
   </tr>
   
   <tr style='mso-yfti-irow:1'>
    <td style='padding:.75pt .75pt .75pt .75pt'>
    <table class=MsoNormalTable border=0 cellspacing=0 cellpadding=0
     width="100%" style='width:100.0%;mso-cellspacing:0in;mso-yfti-tbllook:
     1184;mso-padding-alt:7.5pt 7.5pt 7.5pt 7.5pt'>
     <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'>
      <td style='border:none;border-bottom:solid #6CC2A0 1.0pt;mso-border-bottom-alt:
      solid #6CC2A0 .75pt;padding:3.0pt 3.0pt 3.0pt 3.0pt'>
      <p class=MsoNormal style='line-height:13.5pt'><span style='font-size:
      12.0pt;mso-fareast-font-family:"Times New Roman";color:black'>To: ${recipientName} <o:p></o:p></span></p>
      </td>
     </tr>
     <tr style='mso-yfti-irow:1'>
      <td style='padding:15.0pt 15.0pt 15.0pt 15.0pt'>
      <p class=MsoNormal style='line-height:13.5pt'><i><span style='font-size:
      12.0pt;mso-fareast-font-family:"Times New Roman";color:black'>${message}<o:p></o:p></span></i></p>
      </td>
     </tr>
     <tr style='mso-yfti-irow:2;mso-yfti-lastrow:yes'>
      <td style='border:none;border-top:solid #6CC2A0 1.0pt;mso-border-top-alt:
      solid #6CC2A0 .75pt;padding:3.0pt 3.0pt 3.0pt 3.0pt'>
      <p class=MsoNormal style='line-height:13.5pt;mso-outline-level:1'><span
      style='font-size:12.0pt;mso-fareast-font-family:"Times New Roman";
      color:black'>From: ${name} <o:p></o:p></span></p>
      <p class=MsoNormal style='line-height:13.5pt;mso-outline-level:1'><span
      style='font-size:12.0pt;mso-fareast-font-family:"Times New Roman";
      color:black'>Email: ${fromEmail} <o:p></o:p></span></p>
      </td>
     </tr>
    </table>
    </td>
   </tr>
   
   <tr style='mso-yfti-irow:3;mso-yfti-lastrow:yes'>
    <td style='padding:.75pt .75pt .75pt .75pt'>
    <table class=MsoNormalTable border=1 cellpadding=0 style='mso-cellspacing:
     1.5pt;border-top:solid #606060 1.0pt;border-left:none;border-bottom:solid #606060 1.0pt;
     border-right:none;mso-border-top-alt:solid #606060 .75pt;mso-border-bottom-alt:
     solid #606060 .75pt;mso-yfti-tbllook:1184'>
     <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;mso-yfti-lastrow:yes'>
      <td style='border:none;padding:.75pt .75pt .75pt .75pt'>
      <div>
      <p class=MsoNormal><span style='mso-fareast-font-family:"Times New Roman"'>This
      GoodwillSpin Charity Gift token/card is a gift. It entitles you to support a charity
      you believe in.<o:p></o:p></span></p>
      </div>
      <div>
      <p class=MsoNormal><span style='mso-fareast-font-family:"Times New Roman"'>To
      claim your gift tokens, <a
      href="https://goodwillspin.netlify.app/#/claim/${redeemId}"
      target="_blank"><span style='color:#6CC2A0'>click this link</span></a><o:p></o:p></span></p>
      </div>
      <div>
      <p class=MsoNormal><span style='mso-fareast-font-family:"Times New Roman"'>It's
      that easy! Thanks for making our community better!<o:p></o:p></span></p>
      </div>
      
      </td>
     </tr>
    </table>
    </td>
   </tr>
  </table>
  </td>
 </tr>
 
    <tr style='mso-yfti-irow:1'>
    <td style='padding:.75pt .75pt .75pt .75pt'>
    <table class=MsoNormalTable border=0 cellspacing=0 cellpadding=0
     width="100%" style='width:100.0%;mso-cellspacing:0in;mso-yfti-tbllook:
     1184;mso-padding-alt:7.5pt 7.5pt 7.5pt 7.5pt'>
     <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'>

     </tr>
     <tr style='mso-yfti-irow:1'>
      <td style='padding:15.0pt 15.0pt 15.0pt 15.0pt'>
      <p class=MsoNormal align=center style='text-align:center'><span
  style='font-size:12.0pt;font-family:"Helvetica",sans-serif;mso-fareast-font-family:
  "Times New Roman"'><a
  href="https://goodwillspin.netlify.app/#/"
  target="_blank"><span style='color:#6CC2A0;text-decoration:none;text-underline:
  none'><img border=0 width=300 id="_x0000_i1025"
  src="https://firebasestorage.googleapis.com/v0/b/goodwillspin-55c9b.appspot.com/o/2page_wheel.png?alt=media&token=b29b3164-cfc6-4161-a0bf-5b6d28f75371"
  alt="Goodwill Spin, a better gift a better world"></span></a><o:p></o:p></span></p>
  <p class=MsoNormal style='line-height:13.5pt'><span style='font-size:
      12.0pt;mso-fareast-font-family:"Times New Roman";color:black'>Donate, Spin, Win<o:p></o:p></span></p>
      <p class=MsoNormal style='line-height:13.5pt'><i><span style='font-size:
      12.0pt;mso-fareast-font-family:"Times New Roman";color:black'>Check out our prize pool and win big by donating to charities:)<o:p></o:p></span></i></p>
      </td>
     </tr>
     <tr style='mso-yfti-irow:2;mso-yfti-lastrow:yes'>
      <td style='border:none;border-top:solid #6CC2A0 1.0pt;mso-border-top-alt:
      solid #6CC2A0 .75pt;padding:3.0pt 3.0pt 3.0pt 3.0pt'>
      </td>
     </tr>
    </table>
    </td>
   </tr>
 
 
 <tr style='mso-yfti-irow:2'>
  <td style='padding:15.0pt 15.0pt 15.0pt 15.0pt'>
  <p class=MsoNormal><span style='font-size:12.0pt;font-family:"Helvetica",sans-serif;
  mso-fareast-font-family:"Times New Roman"'><a href="mailto:goodwillspin@gmail.com"
  target="_blank"><span style='color:#6CC2A0'>Have a question? Email us at
  goodwillspin@gmail.com</span></a> <o:p></o:p></span></p>
  </td>
 </tr>
 

</div>

</body>
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