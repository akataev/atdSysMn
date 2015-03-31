var mongoose = require('../mongoose'),
    Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var schema = new Schema( {
    number: {
        type: String,
        required: true
    },
    speciality: String,
    _speciality: {
        type: ObjectId,
        ref: 'Speciality'
    }
});


exports.Group = mongoose.model('Group', schema);







//schema.methods.getSpecialityId = function (specialityName) { 
//    Speciality.findOne({ "name": specialityName }, function (err, doc) {
//        if (err) throw err;
//        //console.log(specialityName +'\t'+doc._id);
//        console.log(doc._id);
//        return doc._id;
//    });
//};

//schema.methods.getSpecialityName = function (specialityId) {
//    Speciality.findOne({ "_id": specialityId }, function (err, doc) {
//        if (err) throw err;
        
//        return doc.name;
//    });
//};

//schema.virtual('speciality')
//.set(function (specialityName) {
//    this._speciality = this.getSpecialityId(specialityName);
//    console.log(this._speciality);
//})
//.get(function () {
//    return this.getSpecialityName(specialityId);
//});
