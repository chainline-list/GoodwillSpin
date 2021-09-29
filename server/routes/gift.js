const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

require('dotenv').config();

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
      <p>Id: ${redeemId}</p>
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

module.exports = router; 