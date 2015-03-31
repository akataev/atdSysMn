var User = require('../db/models/user').User;

exports.post = function(req, res) {

};

//exports.post = function(req, res, next){
//    var userData = req.body;
//    console.log(userData);
//
//    if (userData) {
//        var name = userData.username;
//        var pass = userData.password;
//
//        User.authenticate(name, pass, function(err, user){
//            if (err) return next(err);
//
//            if (user) {
//                req.session.user_id = user._id;
//                req.json(user);
//            } else {
//                req.status(403);
//            }
//        })
//    } else {
//        next(new Error('user and pass required'));
//    }
//};
