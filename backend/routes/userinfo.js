var express = require('express');
var router = express.Router();
var api = require('../api.js')
var mongoClient = require("mongodb").MongoClient;

var url = "mongodb://localhost:27017/session";

router.get('/', function (req, res, next) {
    var userData;
    mongoClient.connect(url, function (err, db) {
        const sessionDB = db.db('session')
        sessionDB.collection('sessions')
        if (err) 
            return console.log("err")
        sessionDB.collection("sessions").find().toArray(function (err, results) {
                userData = JSON.parse(results[0].session).user
                api.getUser(userData).then((user) => {
                        res.json(user)
                    })
                db.close()
            })
    })

});

router.post('/addBook', (req) => {
    api
        .updateUserBook(req.body)
        .then(() => {
            console.log("book was created")
        })
        .catch(() => {
            console.log("err, book was not created")
        })
    })

router.post('/addNote', (req, res, next) => {
    api
        .updateUserNote(req.body)
        .then(() => {
            console.log("note was created")
        })
        .catch(() => {
            console.log("err, note was not created")
        })
    })

router.post('/addLable', (req, res, next) => {
    api
        .updateUserLable(req.body)
        .then((res) => {
            console.log("lable created")
        })
        .catch((err) => {
            console.log(err)
        })
    })

router.post('/deleteLable', (req, res, next) => {
    api
        .delUserNoteLable(req.body)
        .then((res) => {
            console.log("lable deleted")
        })
        .catch((err) => {
            console.log(err)
        })
    })

router.post('/deleteBook', (req) => {
    api
        .delUserBook(req.body)
        .then(() => {
            console.log("book was deleted")
        })
        .catch(() => {
            console.log("err")
        })
    })

router.post('/delNote', (req) => {
    api
        .delUserNote(req.body)
        .then(() => {
            console.log("note was deleted")
        })
        .catch(() => {
            console.log("err")
        })
    })

router.post('/changeNote', (req, res, next) => {
    api
        .changeUserNote(req.body)
        .then((res) => {
            console.log("yes")
        })
        .catch((err) => {
            console.log(err)
        })
    })

module.exports = router;
