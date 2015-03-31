var getByIdModule = require('./getByIdModule.js');
var mongoose = require('../db/mongoose.js');
var fs = require('fs');
var path = require('path');
var async = require('async');

fs.readdirSync(path.join(__dirname, '../db/models')).forEach(function (filename) {
    if (~filename.indexOf('.js')) {
        require( path.join(__dirname, '../db/models', filename) );
    }
});

exports.CRUD = {
    findAll: function(req, modelName, callback) {
        mongoose.models[modelName].find(req.query, function(err, docs) {
            var arrData = [];
            async.each(docs, function(doc, cb) {

                getByIdModule.getDataById[modelName](doc._id, function(err, data){
                    if (err) {
                        cb(err);
                    } else {
                        arrData.push(data);
                        cb();
                    }
                });

            }, function(err) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, arrData);
                }
            });
        });
    },

    findById: function(req, modelName, callback) {
        getByIdModule.getDataById[modelName](req.params.id, function(err, data) {
            if (err) {
                callback(err);
            } else {
                callback(null, data);
            }
        });
    },

    add: function(req, modelName, fields, callback) {
        var data = req.body;
        console.log(data);

        var addData = {};
        fields.forEach(function(field){
            addData[field] = data[field];
        });
        var instance = new mongoose.models[modelName](addData);
        instance.save(function(err) {
            if (err) {
                callback(err);
            } else {
                callback(null, instance);
            }
        });
    },

    update: function(req, modelName, fields, callback) {
        var data = req.body;
        console.log(data);

        var updateData = {};
        fields.forEach(function(field){
            updateData[field] = data[field];
        });
        mongoose.models[modelName].findByIdAndUpdate(req.params.id, updateData, function(err){
            if (err) {
                callback(err);
            } else {
                callback(null, updateData);
            }
        });
    },

    remove: function(req, modelName, callback) {
        mongoose.models[modelName].findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        });
    }
};