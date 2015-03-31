var Permission = require('../db/models/permission').Permission;

exports.findAll = function(req, res){
    Permission.find({}, function(err, permissions) {
        if (err || !permissions) {
            res.status(404);
        }
        res.json(permissions);
    });
};

exports.findById = function(req, res) {
    Permission.findById(req.params.id, function(err, permission){
        if (err || !permission) {
            res.status(404);
        }
        res.json(permission);
    });
};
