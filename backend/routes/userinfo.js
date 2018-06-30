var express = require('express');
var router = express.Router();
var api = require('../api.js')
var mongoose = require("mongoose");
var mongoClient = require("mongodb").MongoClient;

var url = "mongodb://localhost:27017/session";
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport')

router.get('/', function(req, res, next) {
    var userData;

    mongoClient.connect(url, function(err, db){

        const sessionDB = db.db('session')
        sessionDB.collection('sessions')

        if(err)
            return console.log("fuxk")

        sessionDB.collection("sessions").find().toArray(function(err, results){
            userData=JSON.parse(results[0].session).user
            api.getUser(userData)
                .then((user)=>{ res.json(user)})
            db.close()
        })
    })

});
 
router.post('/book',(req)=>{
    console.log(req.body)
    api.updateUserBook(req.body)
    .then(()=>{console.log("book was created")})
    .catch(()=>{
console.log("err, book was not created")})
})

router.post('/note',(req,res,next)=>{
    console.log(req.body)
    api.updateUserNote(req.body)
    .then(()=>{console.log("note was created")})
    .catch(()=>{console.log("err, note was not created")})
})

router.post('/addLable',(req,res,next)=>{
    console.log(req.body)
    api.updateUserLable(req.body)
    .then((res)=>{console.log("yes")})
    .catch((err)=>{
        console.log(err)
    })
})

router.post('/delbook',(req,res,next)=>{
    console.log(req.body)
    api.delUserBook(req.body)
    .then((res)=>{console.log("yes")})
    .catch((err)=>{
        console.log(err)
    })
})

router.post('/delnote',(req,res,next)=>{
    console.log(req.body)
    api.delUserNote(req.body)
    .then(()=>{console.log("yes")})
    .catch((err)=>{
        console.log("err")
    })
})


router.post('/chNote',(req,res,next)=>{
    console.log(req.body)
    api.changeUserNote(req.body)
    .then((res)=>{console.log("yes")})
    .catch((err)=>{
        console.log(err)
    })
})
router.post('/send',(req,res,next)=>{
  nodemailer.createTestAccount((err, account) => {
  var transporter = nodemailer.createTransport(smtpTransport({
    host: 'debugmail.io',
    port: 25,
    auth: {
        user: 'ira.ageenkoo@gmail.com',
        pass: 'f47b2360-24a3-11e8-8004-4f4417984361'
  }
}))

  let mailOptions = {
      to: 'ira.ageenkoo@gmail.com',
      subject: 'Hello ✔',
      text: 'Hello world?',
      html: '<b>Hello world?</b>',
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
});

})
module.exports = router;
