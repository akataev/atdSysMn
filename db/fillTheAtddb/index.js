var mongoose     = require('../mongoose.js');
var async        = require('async');
var testDbInsert = require('./testDbInsert');
var fs           = require('fs');
var path         = require('path');

async.series([
    open,
    dropDatabase,
    requireModels,
    createPermissions,
    createRoles,
    createUsers,
    createSpecialities,
    createGroups,
    createStudents,
    createChairs,
    createTeachers,
    createSubjects,
    createAttendances
], function (err) {
    if (err) {
        console.error(err);
        //process.exit(255);
    }
    console.log(arguments);
    mongoose.disconnect();
});


function open(callback) {
    mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
}

function requireModels(callback) {
    fs.readdirSync(path.join(__dirname, '../models')).forEach(function (filename) {
        if (~filename.indexOf('.js')) {
            require( path.join(__dirname, '../models', filename) );
        }
    });

    async.each(Object.keys(mongoose.models), function (modelName, callback) {
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback);
}


function createPermissions(callback) {
    var permissions = testDbInsert.permissions;
    async.each(permissions, function (data, callback) {
        var permission = new mongoose.models.Permission(data);
        permission.save(callback);
    }, callback);
}

function createRoles(callback) {
    var roles = testDbInsert.roles;
    async.each(roles, function (data, callback) {
        var role = new mongoose.models.Role(data);

        var query = mongoose.models.Permission.where('name').in(role.permissions);
        query.find(function (err, permissions) {
            if (err) throw err;
            if (permissions) {
                permissions.forEach(function (permission) {
                    role._permissions.push(permission._id);
                });
                role.save(callback);
            }
        });

    }, callback);
}

function createUsers(callback) {
    var users = testDbInsert.users;
    async.each(users, function (userData, callback) {
        var user = new mongoose.models.User(userData);

        var query = mongoose.models.Role.where({ name: user.role });
        query.findOne(function (err, role) {
            if (err) throw err;
            if (role) {
                user._role = role._id;
                user.save(callback);
            }
        });

    }, callback);
}

function createSpecialities(callback) {
    var specialities = testDbInsert.specialities;
    async.each(specialities, function (data, callback) {
        var speciality = new mongoose.models.Speciality(data);
        speciality.save(callback);
    }, callback);
}

function createGroups(callback) {
    var groups = testDbInsert.groups;
    async.each(groups, function (data, callback) {
        var group = new mongoose.models.Group(data);

        var query = mongoose.models.Speciality.where({ name: group.speciality });
        query.findOne(function (err, speciality) {
            if (err) throw err;
            if (speciality) {
                group._speciality = speciality._id;
                group.save(callback);
            }
        });

    }, callback);
}

function createStudents(callback) {
    var students = testDbInsert.students;
    async.each(students, function (data, callback) {
        var student = new mongoose.models.Student(data);

        var query = mongoose.models.Group.where({ number: student.group });
        query.findOne(function (err, group) {
            if (err) throw err;
            if (group) {
                student._group = group._id;
                student.save(callback);
            }
        });

    }, callback);
}

function createChairs(callback) {
    var chairs = testDbInsert.chairs;
    async.each(chairs, function (data, callback) {
        var chair = new mongoose.models.Chair(data);
        chair.save(callback);
    }, callback);
}

function createTeachers(callback) {
    var teachers = testDbInsert.teachers;
    async.each(teachers, function (data, callback) {
        var teacher = new mongoose.models.Teacher(data);

        var query = mongoose.models.Chair.where({ name: teacher.chair });
        query.findOne(function (err, chair) {
            if (err) throw err;
            if (chair) {
                teacher._chair = chair._id;
                teacher.save(callback);
            }
        });

    }, callback);
}

function createSubjects(callback) {
    var subjects = testDbInsert.subjects;
    async.each(subjects, function (data, callback) {
        var subject = new mongoose.models.Subject(data);

        var queryTeacher = mongoose.models.Teacher.where({
            name: subject.teacher.name,
            surname: subject.teacher.surname
        });
        queryTeacher.findOne(function (err, teacher) {
            if (err) throw err;
            if (teacher) {
                subject._teacher = teacher._id;

                var queryGroups = mongoose.models.Group.where('number').in(subject.groups);
                queryGroups.find(function (err, groups) {
                    if (err) throw err;
                    if (groups) {
                        groups.forEach(function (group) {
                            subject._groups.push(group._id);
                        });
                        subject.save(callback);
                    }
                });

            }
        });
    }, callback);
}

function createAttendances(callback) {
    var attendances = testDbInsert.attendances;
    async.each(attendances, function (data, callback) {
        var attendance = new mongoose.models.Attendance(data);

        var querySubject = mongoose.models.Subject.where({ name: attendance.subject });
        querySubject.findOne(function (err, subject) {
            if (err) throw err;

            attendance._subject = subject._id;
            getGroup(callback);
        });

        function getGroup(callback) {
            var queryGroup = mongoose.models.Group.where({ number: attendance.group });
            queryGroup.findOne(function(err, group){
                if (err) throw err;

                attendance._group = group._id;
                getStudents(group.number, callback);
            });
        }

        function getStudents(groupNumber, callback) {
            console.log(attendance.atdStudents);

            async.each(attendance.atdStudents, function(atdStudent, cb){
                var queryStudents = mongoose.models.Student.where({
                    group: groupNumber,
                    name: atdStudent.name,
                    surname: atdStudent.surname
                });
                queryStudents.findOne(function(err, student) {
                    if (err) throw err;

                    attendance._atdStudents.push(student._id);

                    cb();
                });

            }, function(err) {
                if (err) throw err;

                attendance.save(callback);
            })

        }

    }, callback);
}












//function createSpecialitiesNGroups(callback) {

//    var Speciality = mongoose.models.Speciality;
//    //var Group = mongoose.models.Group;

//    var isat = new Speciality({
//        name: 'ISAT'
//    });
//    //isat.save(function (err) {
//    //    if (err) console.error(err);

//    //    //var myGroups = [
//    //    //    {
//    //    //        number: '22505',
//    //    //        _speciality: isat._id
//    //    //    }, 
//    //    //    {
//    //    //        number: '22506',
//    //    //        _speciality: isat._id
//    //    //    }
//    //    //];

//    //    //async.each(myGroups, function (data, callback) {
//    //    //    var group = new Group(data);
//    //    //    group.save(callback);
//    //    //}, callback);

//    //}, callback);

//    //var amcs = new Speciality({
//    //    name: 'AMCS'
//    //});
//    //amcs.save(function (err) {
//    //    if (err) console.error(err);

//    ////    var myGroups = [
//    ////        {
//    ////            number: '22503',
//    ////            _speciality: amcs._id
//    ////        }, 
//    ////        {
//    ////            number: '22504',
//    ////            _speciality: amcs._id
//    ////        }
//    ////    ];

//    ////    async.each(myGroups, function (data, callback) {
//    ////        var group = new Group(data);
//    ////        group.save(callback);
//    ////    }, callback);

//    //}, callback);
//};




//function createStudents(callback) {
//    var students = [
//        {
//            "name": "Alexander",
//            "surname": "Kataev",
//            "group": "22505",
//            "isElder": true
//        },
//        {
//            "name": "Alexander",
//            "surname": "Buiko",
//            "group": "22505",
//            "isElder": false
//        }
//    ];

//    async.each(students, function (data, callback) {
//        var student = new mongoose.models.Student(data);
//        student.save(callback);
//    }, callback);
//};









//function createDatabase(callback) {
//    async.parallel([
//        function createTeachers(callback) {
//            var teachers = testDbInsert.get('teachers');
//            async.each(teachers, function (data, callback) {
//                var teacher = new mongoose.models.Teacher(data);
//                teacher.save(callback);
//            }, callback);
//        },
//        function createSubjects(callback) {
//            var subjects = testDbInsert.get('subjects');
//            async.each(subjects, function (data, callback) {
//                var subject = new mongoose.models.Subject(data);
//                subject.save(callback);
//            }, callback);
//        }
//    ], callback);
//}






// function createAttendances(callback) {
//     var attendances = {};

//     //var attendances = testDbInsert.get('attendances');
//     //async.each(attendances, function (data, callback) {
//     //    var attendance = new mongoose.models.Attendance(data);
//     //    attendance.save(callback);
//     //}, callback);


//     // attendance
//     /*db.attendance.insert(
//     {
//     date:     "15-10-2014",
//     subject:  "",
//     teacher:  "",
//     groups:   ["22505", "22508"]
//     }
//     )*/

// }
















//function createUsers(callback) {
//    //async.parallel([
//    //    function (callback) {
//    //        var aborod = new User({ username: 'aborod', password: 'tchrpass', role: 'teacher' });
//    //        aborod.save(function (err) {
//    //            callback(err, aborod);
//    //        });
//    //    },
//    //    function (callback) {
//    //        var kataev = new User({ username: 'kataev', password: 'kataevpass', role: 'elder' });
//    //        kataev.save(function (err) {
//    //            callback(err, kataev);
//    //        });
//    //    },
//    //    function (callback) {
//    //        var buiko = new User({ username: 'buiko', password: 'buikopass', role: 'student' });
//    //        buiko.save(function (err) {
//    //            callback(err, buiko);
//    //        });
//    //    }
//    //], callback);
//}



//// users
//User.remove({}, function (err) { 
//    if (err) return console.error(err);
//});

//var user = new User({
//    username: "tester",
//    password: "secret",
//    role: "tester"
//});

//user.save(function (err, user, affected) {
//    if (err) return console.error(err);
    
//    User.findOne({ username: "tester" }, function (err, findResult) {
//        console.log(findResult);
//    });
//});





















//// students

//var student = new Student({
//    name: "Ivan",
//    surname: "Ivanov",
//    group: "22505",
//    isElder: true
//});
//student.save(function (err, student, affected) {
//    if (err) return console.error(err);
//});

//// teachers

//var teacher = new Teacher({
//    name: 'Alexander',
//    surname: 'Borodin',
//    chair: 'IMO'
//});
//teacher.save(function (err, student, affected) {
//    if (err) return console.error(err);
//});

//// subjects

//var subject = new Subject({ name: 'C++' });
//subject.save(function (err, student, affected) {
//    if (err) return console.error(err);
//});

//// attendances

//var attendance = new Attendance({
//    //date: 
//});
//attendance.save(function (err, student, affected) {
//    if (err) return console.error(err);
//});