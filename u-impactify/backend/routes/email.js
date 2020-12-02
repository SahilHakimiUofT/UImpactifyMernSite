const router = require('express').Router();
const nodemailer = require('nodemailer');

const transport = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
}

const transporter = nodemailer.createTransport(transport);
transporter.verify((error, success) => {
  if (error) {
    console.log(error)
  } else {
    console.log('Email ready to be sent')
  }
})

router.route('/').post((req, res) => {
  const mail = {
    from: process.env.EMAIL,
    to: req.body.email,
    subject: req.body.subject,
    text: req.body.text
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.status(400).json('Error: ' + err);
    } else {
      res.json('Email sent')
    }
  })
})

module.exports = router;