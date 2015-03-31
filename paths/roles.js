var Role = require('../db/models/role').Role;

exports.findAll = function(req, res){
    Role.find({}, function(err, roles) {
        if (err || !roles) {
            res.status(404);
        }
        res.json(roles);
    });
};

exports.findById = function(req, res) {
    Role.findById(req.params.id, function(err, role){
        if (err || !role) {
            res.status(404);
        }
        res.json(role);
    });
};
