var mongoose = require('mongoose');
var config   = require('../config').mongoose;

mongoose.connect(config.uri, config.options, function(err){
    if (err) throw err;
    console.log("Connected to 'atddb' database");
});

module.exports = mongoose;