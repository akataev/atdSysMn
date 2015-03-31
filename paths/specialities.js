var Speciality = require('../db/models/speciality').Speciality;
var CRUD          = require('./../sys_modules/CRUDmodule.js').CRUD;

var modelName = "Speciality";
var fields = [
    'name'
];

exports.findAll = function(req, res){
    Speciality.find({}, function(err, specialities) {
        if (err || !specialities) {
            res.status(404);
        }
        res.json(specialities);
    });
};

exports.findById = function(req, res) {
    Speciality.findById(req.params.id, function(err, speciality){
        if (err || !speciality) {
            res.status(404);
        }
        res.json(speciality);
    });
};

exports.addSpeciality = function(req, res) {
    console.log('*** addSpeciality request');

    CRUD.add(req, modelName, fields, function(err, speciality) {
        if (err) {
            res.status(400).send(err.toString());
            console.log(err.toString());
        } else {
            res.status(201).send(speciality);
            console.log('added successfully');
        }
    });
};

exports.updateSpeciality = function(req, res) {
    console.log('*** updateSpeciality request');

    CRUD.update(req, modelName, fields, function(err, speciality) {
        if (err) {
            res.status(400).send(err.toString());
            console.log(err.toString());
        } else {
            res.status(200).send(speciality);
            console.log('updated successfully');
        }
    });
};

exports.deleteSpeciality = function(req, res) {
    console.log('*** deleteSpeciality request');

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