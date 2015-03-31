var Group      = require('../db/models/group').Group;
var Chair      = require('../db/models/chair').Chair;
var Speciality = require('../db/models/speciality').Speciality;
var Student    = require('../db/models/student').Student;
var Teacher    = require('../db/models/teacher').Teacher;
var Subject    = require('../db/models/subject').Subject;
var Attendance = require('../db/models/attendance').Attendance;

var utils = require('./utils.js');

var async = require('async');


exports.getDataById = {
    "Group": function(groupId, callback) {
        var groupData = {};
        Group.findById(groupId, function (err, group) {
            if (err) {
                callback(err);
            } else {
                groupData = {
                    _id: group._id,
                    number: group.number
                };
                Speciality.findById(group._speciality, function(err, speciality) {
                    if (err) {
                        callback(err);
                    } else {
                        groupData.speciality = {
                            _id: group._speciality,
                            name: speciality.name
                        };
                        callback(null, groupData);
                    }
                });
            }
        });
    },

    "Student": function (studentId, callback) {
        var studentData = {};
        Student.findById(studentId, function(err, student){
            if (err) {
                callback(err);
            } else {
                studentData = {
                    _id: student._id,
                    name: student.name,
                    surname: student.surname,
                    isElder: student.isElder
                };
                Group.findById(student._group, function(err, group){
                    if (err) {
                        callback(err);
                    } else {
                        studentData.group = {
                            _id: student._group,
                            number: group.number
                        };
                        callback(null, studentData);
                    }
                });
            }
        });
    },

    "Teacher": function(teacherId, callback) {
        var teacherData = {};
        Teacher.findById(teacherId, function(err, teacher) {
            if (err) return callback(err);

            teacherData = {
                _id: teacher._id,
                name: teacher.name,
                surname: teacher.surname
            };
            Chair.findById(teacher._chair, function(err, chair) {
                if (err) return callback(err);

                teacherData.chair = {
                    _id: teacher._chair,
                    name: chair.name
                };
                callback(null, teacherData);
            });
        });
    },

    "Subject": function(subjectId, callback) {
        var subjectData = {};
        Subject.findById(subjectId, function(err, subject){
            if (err) return callback(err);

            subjectData = {
                _id: subject._id,
                name: subject.name,
                type: subject.type
            };

            async.parallel([
                function(cb) {
                    Teacher.findById(subject._teacher, function(err, teacher){
                        if (err) return cb(err);

                        subjectData.teacher = {
                            _id: subject._teacher,
                            name: teacher.name,
                            surname: teacher.surname
                        };
                        cb();
                    });
                },
                function(cb) {
                    Group.find({'_id': {$in: subject._groups}}, function (err, groups) {
                        if (err) return cb(err);

                        subjectData.groups = [];
                        groups.forEach(function(group){
                            subjectData.groups.push({
                                _id: group._id,
                                number: group.number
                            });
                        });
                        cb();
                    });
                }
            ],
            function(err) {
                if (err) return callback(err);

                callback(null, subjectData);
            });
        });
    },

    "Attendance": function(attendanceId, callback){
        var attendanceData = {};
        Attendance.findById(attendanceId, function(err, attendance){
            if (err) return callback(err);

            attendanceData = {
                _id: attendance._id,
                date: attendance.date.toDateString(),
                elderCanEdit: attendance.elderCanEdit
            };

            async.parallel([
                function(cb) {
                    Subject.findById(attendance._subject, function(err, subject) {
                        if (err) return cb(err);

                        attendanceData.subject = {
                            _id: subject._id,
                            name: subject.name
                        };
                        cb();
                    });
                },
                function(cb) {
                    Group.findById(attendance._group, function(err, group) {
                        if (err) return cb(err);

                        attendanceData.group = {
                            _id: group._id,
                            number: group.number
                        };
                        cb();
                    });
                },
                function(cb) {



                    utils.getSubjectsListByGroupId(attendance._group, function(err, students){
                        if (err) return cb(err);

                        attendanceData.students = [];
                        students.forEach(function(student) {
                            var atd = true;

                            // check if not in atdStudents
                            if (attendance._atdStudents.indexOf(student._id) == -1) {
                                atd = false;
                            }

                            attendanceData.students.push({
                                _id: student._id,
                                name: student.name,
                                surname: student.surname,
                                atd: atd
                            });
                        });
                        cb();
                    });

                    //Student.find({'_id': {$in: attendance._atdStudents}}, function (err, atdStudents) {
                    //    if (err) return cb(err);
                    //
                    //    attendanceData.atdStudents = [];
                    //    atdStudents.forEach(function(atdStudent){
                    //        attendanceData.atdStudents.push({
                    //            _id: atdStudent._id,
                    //            name: atdStudent.name,
                    //            surname: atdStudent.surname
                    //        });
                    //    });
                    //    cb();
                    //});
                }
            ],
            function(err){
                if (err) return callback(err);

                callback(null, attendanceData);
            })
        });
    }
};