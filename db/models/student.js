var mongoose = require('../mongoose'),
    Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var schema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    group: String,
    _group: {
        type: ObjectId,
        ref: 'Group'
    },
    isElder: {
        type: Boolean,
        default: false
    }
});

exports.Student = mongoose.model('Student', schema);