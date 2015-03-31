var mongoose = require('../mongoose'),
    Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var crypto = require('crypto');
var format = require('util').format;

var schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    role: String,
    _role: {
        type: ObjectId,
        ref: 'Role'
    },
    created: {
        type: Date,
        default: Date.now
    }
});

schema.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
    .set(function (password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function () { return this._plainPassword; });

schema.methods.checkPassword = function (password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

//schema.statics.authenticate = function(name, pass, callback) {
//    this.findOne({username: name}, function(err, user) {
//        if (err) return callback(err);
//
//        if (user) {
//            if (user.checkPassword(pass)) {
//                return callback(null, user);
//            } else {
//                callback(new Error(format('incorrect password for user %s', user)));
//            }
//        } else {
//            callback(new Error(format('user %s not found', user)));
//        }
//    })
//};


exports.User = mongoose.model('User', schema);