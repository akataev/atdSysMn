var mongoose = require('../mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    }
});


exports.Chair = mongoose.model('Chair', schema);