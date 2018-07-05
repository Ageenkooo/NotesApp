var express = require('express');
var router = express.Router();
var api = require('../api.js')
var mongoose = require("mongoose");
var mongoClient = require("mongodb").MongoClient;

var url = "mongodb://localhost:27017/session";

router.get('/', function(req, res, next) {
    var userData;

    mongoClient.connect(url, function(err, db){

        const sessionDB = db.db('session')
        sessionDB.collection('sessions')

        if(err)
            return console.log("err")

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
    .then((res)=>{console.log("lable created")})
    .catch((err)=>{
        console.log(err)
    })
})

router.post('/deleteLable',(req,res,next)=>{
    console.log(req.body)
    api.delUserNoteLable(req.body)
    .then((res)=>{console.log("lable deleted")})
    .catch((err)=>{
        console.log(err)
    })
})


router.post('/delbook',(req)=>{
    console.log(req.body)
    api.delUserBook(req.body)
    .then(()=>{console.log("book was deleted")})
    .catch(()=>{
        console.log("err")
    })
})

router.post('/delnote',(req)=>{
    console.log(req.body)
    api.delUserNote(req.body)
    .then(()=>{console.log("note was deleted")})
    .catch(()=>{
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

module.exports = router;
