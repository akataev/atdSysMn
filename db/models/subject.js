var mongoose = require('../mongoose'),
    Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


var schema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    teacher: Schema.Types.Mixed,
    _teacher: {
        type: ObjectId,
        ref: 'Teacher'
    },
    groups: [String],
    _groups: [{
        type: ObjectId,
        ref: 'Group'
    }]
});


exports.Subject = mongoose.model('Subject', schema);