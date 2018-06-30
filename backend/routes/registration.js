var express = require('express');
var router = express.Router();
var api = require('../api.js')

router.post('/', (req, res, next)=>{
  console.log(req.body);
    api.createUser(req.body)
  	   .then(function(result){
  		     console.log("User created")
           res.json("ok")
  	      })
  	    .catch(function(err){
  		      if (err.toJSON().code == 11000){
                console.log("user wasn't created because this email already exist");

  		          }
  	      })
});

module.exports = router;
