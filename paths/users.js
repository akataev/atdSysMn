//var mongoose   = require('../db/mongoose');
var async      = require('async');
var User       = require('../db/models/user').User;
//var Role       = require('../db/models/role').Role;

exports.findAll = function(req, res){
    User.find({}, function(err, users){
        if (err || !users) {
            res.status(404);
        }
        res.json(users);
    });
/*    User.find({}, function(err, users) {
        if (err) throw err;
        var uu = [];
        async.each(users, function(u, cb){
            getUser(u._id, function(err, user){
                if (err) throw err;
                uu.push(user);
                cb();
            })
        }, function(err){
            if (err) throw err;
            res.json(uu);
        });
    });*/
/*    User.find({}, function(err, users) {
        if (err) throw err;

        var data = [];
        async.each(users, function(user, callback) {
            getUserDataById(user._id, function(err, userData){
                if (err) throw err;
                data.push(userData);
                callback();
            });
        }, function(err){
            if (err) throw err;
            res.json(data);
        });

    });*/
};

exports.findById = function(req, res){
    User.findById(req.params.id, function(err, user){
        if (err || !user) {
            res.status(404);
        }
        res.json(user);
    });
/*    getUser(req.params.id, function(err, user) {
        if (err) {
            res.status(404).send(err.toString());
        } else {
            res.json(user);
        }
    });*/
/*    getUserDataById(req.params.id, function(err, userData){
        if (err) throw err;
        res.json(userData);
    });*/
};


/*function getUser(userId, callback) {
    User.findById(userId, function(err, user){
        if (err) {
            callback(err)
        } else {
            if (user) {
                var u = {
                    "_id": user._id,
                    "username": user.username,
                    "role": user.role,
                    "_role": user._role,
                    "created": user.created
                };
                callback(null, u);
            } else {
                callback(new Error("There is no user with id == " + userId));
            }
        }
    });
}*/


/*function getUserDataById(userId, callback) {
    var userData = {};
    User.findById(userId, function(err, user){
        if (user) {
            userData.user_ID = user._id;
            userData.login = user.username;
            Role.findById(user._role, function(err, role) {
                userData.role = role.name;

                callback(null, userData);
            });
        } else {
            callback(null, userData);
        }
    });
}*/

/*
exports.addUser = function(req, res){
    // ...
};

exports.updateUser = function(req, res){
    // ...
};

exports.deleteUser = function(req, res){
    // ...
};
*/
