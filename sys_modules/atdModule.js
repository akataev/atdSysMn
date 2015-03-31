var Attendance = require('../db/models/attendance').Attendance;
var Subject = require('../db/models/subject').Subject;
var Group = require('../db/models/group').Group;
var async = require('async');
var utils = require('./utils');

exports.groupJournal = function(params, callback) {
    getGroupJournal(params._group, params._subject, function(err, journal) {
        if (err) return callback(err);

        callback(null, journal);
    });
};

exports.groupStats = function(groupId, callback) {
    var stats = {};
    stats.subjects = [];
    stats.students = [];

    utils.getStudentsListByGroupId(groupId, function(err, students) {
        if (err) return callback(err);

        students.forEach(function(student) {
            stats.students.push({
                _id: student._id,
                name: student.name,
                surname: student.surname,
                stat: []
            })
        });

        fillStats();
    });

    function fillStats() {
        utils.getSubjectsListByGroupId(groupId, function (err, subjects) {
            if (err) return callback(err);

            async.eachSeries(subjects, function (subject, cb) {
                stats.subjects.push({
                    _id: subject._id,
                    name: subject.name
                });

                getGroupJournal(groupId, subject._id, function (err, journal) {
                    if (err) {
                        cb(err);
                    } else {
                        stats.students.forEach(function(statsStudent) {
                            journal.students.forEach(function (journalStudent) {

                                if (statsStudent._id.toString() == journalStudent._id.toString()) {

                                    statsStudent.stat.push(journalStudent.stat);
                                    //break;
                                }
                            });
                        });

                        cb();
                    }

                });

            }, function (err) {
                if (err) return callback(err);

                callback(null, stats);
            });
        });
    }

};

exports.subjectJournal = function(subjectId, callback) {
    var resultJournal = {};
    Subject.findById(subjectId, function(err, subject) {
        if (err) return callback(err);

        async.eachSeries(subject._groups, function(groupId, cb) {
            getGroupJournal(groupId, subjectId, function(err, journal){
                if (err) {
                    cb(err);
                } else {
                    Group.findById(groupId, function(err, group) {
                        if (err) {
                            cb(err);
                        } else {
                            resultJournal[group.number] = journal;
                            cb();
                        }
                    });
                }
            });

        }, function(err) {
            if (err) return callback(err);

            callback(null, resultJournal);
        });

    });
};


function getGroupJournal(groupId, subjectId, cb) {
    var journal = {};
    journal.dates = {};
    journal.students = [];

    utils.getStudentsListByGroupId(groupId, function(err, students) {
        if (err) return cb(err);

        var numberOfPairs = 0;
        students.forEach(function(student) {
            student.numberOfVisits = 0;
        });

        Attendance.find({_subject: subjectId, _group: groupId}, function(err, attendances){
            if (err) return cb(err);

            attendances.forEach(function(attendance) {
                numberOfPairs++;
                journal.dates[attendance.date.toDateString()] = attendance._atdStudents;

                students.forEach(function(student) {
                    if (attendance._atdStudents.indexOf(student._id) != -1) {
                        student.numberOfVisits++;
                    }
                });
            });

            students.forEach(function(student) {
                student.stat = Math.round(student.numberOfVisits / numberOfPairs * 100);

                journal.students.push({
                    _id: student._id,
                    name: student.name,
                    surname: student.surname,
                    stat: student.stat
                });
            });

            cb(null, journal);
        });
    });
}
