var Teacher    = require('../db/models/teacher').Teacher;
var CRUD          = require('./../sys_modules/CRUDmodule.js').CRUD;

var modelName = 'Teacher';
var fields = [
    'name',
    'surname',
    '_chair'
];

exports.findAll = function(req, res){
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

exports.addTeacher = function (req, res) {
    console.log('*** addTeacher request');

    CRUD.add(req, modelName, fields, function(err, teacher) {
        if (err) {
            res.status(400).send(err.toString());
            console.log(err.toString());
        } else {
            res.status(201).send(teacher);
            console.log('added successfully');
        }
    });
};

exports.updateTeacher = function (req, res) {
    console.log('*** updateTeacher request');

    CRUD.update(req, modelName, fields, function(err, teacher) {
        if (err) {
            res.status(400).send(err.toString());
            console.log(err.toString());
        } else {
            res.status(200).send(teacher);
            console.log('updated successfully');
        }
    });
};

exports.deleteTeacher = function (req, res) {
    console.log('*** deleteTeacher request');

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