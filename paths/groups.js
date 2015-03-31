var Group         = require('../db/models/group').Group;
var CRUD          = require('./../sys_modules/CRUDmodule.js').CRUD;

var modelName = 'Group';
var fields = [
    'number',
    '_speciality'
];

exports.findAll = function(req, res) {
    CRUD.findAll(req, modelName, function(err, arrData) {
        if (err || !arrData) {
            // do something with err ...
            res.status(404);
        } else {
            res.json(arrData);
        }
    });
};

exports.findById = function(req, res) {
    CRUD.findById(req, modelName, function(err, data) {
        if (err || !data) {
            // do something with err ...
            res.status(404);
        } else {
            res.json(data);
        }
    });
};

exports.addGroup = function (req, res) {
    console.log('*** addGroup request');

    CRUD.add(req, modelName, fields, function(err, group) {
        if (err) {
            res.status(400).send(err.toString());
            console.log(err.toString());
        } else {
            res.status(201).send(group);
            console.log('added successfully');
        }
    });
};

exports.updateGroup = function (req, res) {
    console.log('*** updateGroup request');

    CRUD.update(req, modelName, fields, function(err, group) {
        if (err) {
            res.status(400).send(err.toString());
            console.log(err.toString());
        } else {
            res.status(200).send(group);
            console.log('updated successfully');
        }
    });
};

exports.deleteGroup = function (req, res) {
    console.log('*** deleteGroup request');

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