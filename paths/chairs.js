var Chair = require('../db/models/chair').Chair;
var CRUD          = require('./../sys_modules/CRUDmodule.js').CRUD;

var modelName = "Chair";
var fields = [
    'name'
];

exports.findAll = function(req, res){
    Chair.find({}, function(err, chairs) {
        if (err || !chairs) {
            res.status(404);
        }
        res.json(chairs);
    });
};

exports.findById = function(req, res) {
    Chair.findById(req.params.id, function(err, chair){
        if (err || !chair) {
            res.status(404);
        }
        res.json(chair);
    });
};

exports.addChair = function(req, res) {
    console.log('*** addChair request');

    CRUD.add(req, modelName, fields, function(err, chair) {
        if (err) {
            res.status(400).send(err.toString());
            console.log(err.toString());
        } else {
            res.status(201).send(chair);
            console.log('added successfully');
        }
    });
};

exports.updateChair = function(req, res) {
    console.log('*** updateChair request');

    CRUD.update(req, modelName, fields, function(err, chair) {
        if (err) {
            res.status(400).send(err.toString());
            console.log(err.toString());
        } else {
            res.status(200).send(chair);
            console.log('updated successfully');
        }
    });
};

exports.deleteChair = function(req, res) {
    console.log('*** deleteChair request');

    CRUD.remove(req, modelName, function(err) {
        if (err) {
            res.status(400).send(err.toString());
            console.log(err.toString());
        } else {
            var msg = "removed successfully";
            res.status(200).send(msg);
            console.log(msg);
        }
    });
};