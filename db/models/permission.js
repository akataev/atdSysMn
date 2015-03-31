var mongoose = require('../mongoose'),
    Schema = mongoose.Schema;


var schema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description : {
        type: String
    }
});


exports.Permission = mongoose.model('Permission', schema);