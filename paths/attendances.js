var Attendance    = require('../db/models/attendance').Attendance;
var CRUD          = require('./../sys_modules/CRUDmodule.js').CRUD;

var modelName = 'Attendance';
var fields = [
    '_subject',
    '_group',
    '_atdStudents',
    'elderCanEdit'
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

exports.findById = function(req, res){
    CRUD.findById(req, modelName, function(err, data) {
        if (err || !data) {
            // do something with err ...
            res.status(404);
        } else {
            res.json(data);
        }
    });
};

exports.addAttendance = function(req, res){
    console.log('*** addAttendance request');

    CRUD.add(req, modelName, fields, function(err, attendance) {
        if (err) {
            res.status(400).send(err.toString());
            console.log(err.toString());
        } else {
            res.status(201).send(attendance);
            console.log('added successfully');
        }
    });
};

exports.updateAttendance = function(req, res){
    console.log('*** updateAttendance request');

    CRUD.update(req, modelName, fields, function(err, attendance) {
        if (err) {
            res.status(400).send(err.toString());
            console.log(err.toString());
        } else {
            res.status(200).send(attendance);
            console.log('updated successfully');
        }
    });
};

exports.deleteAttendance = function(req, res){
    console.log('*** deleteAttendance request');

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