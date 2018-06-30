var express = require('express');
var router = express.Router();
var api = require('../api.js')

router.post('/', (req, res, next)=>{
		if (req.session.user){
			console.log("User has already logged")
			return res.redirect('/app')
		}
	api.checkUser({email:req.body.email, password:req.body.password})
		.then((user)=>{
			if(user){
				req.session.user = {id: user._id, email: user.email}
				req.session.save();
				console.log("Access")
				res.json("Access")
			}
			else {
					console.log("smth is wrong1")
			}
		})
		.catch(function(error){
			console.log("Error")
		})
});


module.exports = router;
