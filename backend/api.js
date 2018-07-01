var mongoose = require('mongoose')
var crypto = require('crypto')
mongoose.Promise = global.Promise

var db = mongoose.connect(
    "mongodb://localhost:27017/usersdb",
    {useMongoClient: true}
)
var User = require('./db/User.js')

exports.createUser = (userData) => {
    var user = {
        name: userData.name,
        password: hash(userData.password),
        email: userData.email,
        books: userData.books,
        notes: userData.notes
    }
    return new User(user).save()
}

exports.getUser = (userData) => {
    return User.findOne({_id: userData.id})
}
//fixed+
exports.updateUserBook = (userData) => {
	let min = 0;
	let max = 999999;
	let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return User.update({
        _id: userData.id
    }, {
        $addToSet: {
            books: {
                id: randomNum,
                deleted: false,
                selected: false,
                book: userData.book
            }
        }
    })
}

exports.updateUserNote = (userData) => {
    let min = 0;
	let max = 999999;
	let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return User.update({
        _id: userData.id
    }, {
        $addToSet: {
            notes: {
                book_id: userData.book_id,
                id: randomNum,
                name: userData.name,
                text: 'put your text here',
                deleted: false,
                selected: false,
                lables: []
            }
        }
    })
}

exports.updateUserLable = (userData) => {
    return User.update({
        _id: userData.id,
        "notes": {
            $elemMatch: {
                "id": userData.note_id
            }
        }
    }, {
        $addToSet: {
            "notes.$.lables": {
                id: userData.num + 1,
                text: userData.lable
            }
        }
    }, function (err, user) {
        if (err) 
            throw err
    })
}

exports.changeUserNote = (userData) => {
    return User.update({
        _id: userData.id,
        "notes": {
            $elemMatch: {
                "id": userData.note_id
            }
        }
    }, {
        $set: {
            "notes.$.text": userData.text
        }
    }, function (err, user) {
        if (err) 
            throw err
    })
}
exports.delUserBook = (userData) => {
	console.log(userData)
    return User.update({
        _id: userData.id
    }, {
        $pull: {
            'books': {
                id: userData.book.id
            }
        }
    }, function (err) {
        if (err) 
            throw err
    })
}
exports.delUserNote = (userData) => {
    console.log(userData)
    return User.update({
        _id: userData.id,
    }, {
        $pull: {
            'notes': {
                id: userData.note.id
            }
        }
    }, function (err) {
        if (err) 
            throw err;
        }
    )
}
exports.checkUser = (userData) => {
    return User
        .findOne({email: userData.email})
        .then(function (doc) {
            if (doc.password == hash(userData.password)) {
                console.log("User password is ok")
                return Promise.resolve(doc)
            } else {
                console.log("Password is wrong!")
                return Promise.reject("Error wrong")
            }
        })
}

function hash(text) {
    return crypto
        .createHash('sha1')
        .update(text)
        .digest('base64')
}
