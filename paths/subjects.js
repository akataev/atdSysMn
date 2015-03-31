var Subject       = require('../db/models/subject').Subject;
var CRUD          = require('./../sys_modules/CRUDmodule.js').CRUD;

var modelName = 'Subject';
var fields = [
    'name',
    'type',
    '_teacher',
    '_groups'
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

exports.addSubject = function(req, res){
    console.log('*** addSubject request');

    CRUD.add(req, modelName, fields, function(err, subject) {
        if (err) {
            res.status(400).send(err.toString());
            console.log(err.toString());
        } else {
            res.status(201).send(subject);
            console.log('added successfully');
        }
    });
};

exports.updateSubject = function(req, res){
    console.log('*** updateSubject request');

    CRUD.update(req, modelName, fields, function(err, subject) {
        if (err) {
            res.status(400).send(err.toString());
            console.log(err.toString());
        } else {
            res.status(200).send(subject);
            console.log('updated successfully');
        }
    });
};

exports.deleteSubject = function(req, res){
    console.log('*** deleteSubject request');

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
