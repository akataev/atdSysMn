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
    chair: String,
    _chair: {
        type: ObjectId,
        ref: 'Chair'
    }
});

/*schema.methods.getFullName = function() {
    return this.name + " " + this.surname;
};*/


exports.Teacher = mongoose.model('Teacher', schema);