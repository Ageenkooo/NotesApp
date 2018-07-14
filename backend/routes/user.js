var express = require('express');
var router = express.Router();
var api = require('../api.js')

router.post('/login', (req, res) => {
    if (req.session.user) {
        console.log('User has already logged')
        return res.redirect('/')
    }
    api
        .checkUser({email: req.body.email, password: req.body.password})
        .then((user) => {
            if (user) {
                req.session.user = {
                    id: user._id,
                    email: user.email
                }
                req.session.save();
                res.json('Access')
            } else {
                console.log('smth is wrong')
            }
        })
        .catch(function () {
            console.log('Error')
        })
	});
	
router.post('/logout', function (req, res) {
    console.log(req)
    if (req.session.user) {
        delete req.session.user;
    }
    res.json('logout')

});

module.exports = router;
