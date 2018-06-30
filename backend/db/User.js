var mongoose = require('mongoose');
var User = new mongoose.Schema({
    name : {
        type: String,
        unique: true,
    },
    password : {
        type: String,
        required: true,
        unique: false,
    },
    email : {
      type: String,
      unique: true,
      required: true,
  },
    books:{
        type: Array,
        unique: false,
    },
    notes:{
        type: Array,
        unique: false,
    }
})

module.exports = mongoose.model('User', User)
