var mongoose = require('../mongoose'),
    Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


var schema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    permissions: [String],
    _permissions: [{
        type: ObjectId,
        ref: 'Permission'
    }]
});


exports.Role = mongoose.model('Role', schema);