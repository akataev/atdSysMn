var mongoose = require('../mongoose'),
    Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var schema = new Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    subject: String,
    _subject: {
        type: ObjectId,
        ref: 'Subject'
    },
    group: String,
    _group: {
        type: ObjectId,
        ref: 'Group'
    },
    atdStudents: [Schema.Types.Mixed],
    _atdStudents: [{
        type: ObjectId,
        ref: 'Students'
    }],
    elderCanEdit: Boolean
});

exports.Attendance = mongoose.model('Attendance', schema);