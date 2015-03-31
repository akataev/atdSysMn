var Student    = require('../db/models/student').Student;
var Subject    = require('../db/models/subject').Subject;

exports.getStudentsListByGroupId = function(groupId, cb) {
    Student.find({_group: groupId}, function(err, students) {
        if (err) return cb(err);

        cb(null, students);
    });
};

exports.getSubjectsListByGroupId = function(groupId, cb) {
    var resultSubjects = [];
    Subject.find({}, function(err, subjects) {
        if (err) return cb(err);

        subjects.forEach(function(subject) {
           if (subject._groups.indexOf(groupId) != -1) {
               resultSubjects.push(subject);
           }
        });
        cb(null, resultSubjects);
    });
};

exports.getSubjectsListByTeacherId = function(teacherId, cb) {
    Subject.find({_teacher: teacherId}, function(err, subjects) {
        if (err) return cb(err);

        cb(null, subjects);
    });
};
