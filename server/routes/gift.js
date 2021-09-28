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
    subject: 'Sending Email using Node.js',
    html: `
      <h1>From, ${from}</h1>
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