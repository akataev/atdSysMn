var Student       = require('../db/models/student').Student;
var CRUD          = require('./../sys_modules/CRUDmodule.js').CRUD;

var modelName = 'Student';
var fields = [
    'name',
    'surname',
    '_group',
    'isElder'
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

exports.addStudent = function(req, res){
    console.log('*** addStudent request');

    CRUD.add(req, modelName, fields, function(err, student) {
        if (err) {
            res.status(400).send(err.toString());
            console.log(err.toString());
        } else {
            res.status(201).send(student);
            console.log('added successfully');
        }
    });
};

exports.updateStudent = function(req, res){
    console.log('*** updateStudent request');

    CRUD.update(req, modelName, fields, function(err, student) {
        if (err) {
            res.status(400).send(err.toString());
            console.log(err.toString());
        } else {
            res.status(200).send(student);
            console.log('updated successfully');
        }
    });
};

exports.deleteStudent = function(req, res){
    console.log('*** deleteStudent request');

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