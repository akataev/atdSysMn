var mongoose      = require('./db/mongoose.js');
var express       = require('express');
var bodyParser    = require('body-parser');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var MongoStore    = require('connect-mongo')(session);
var morgan        = require('morgan');
var favicon       = require('serve-favicon');
var path          = require('path');
var config        = require('./config');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// require paths
var attendance   = require('./paths/attendances');
var user         = require('./paths/users');
var subject      = require('./paths/subjects');
var group        = require('./paths/groups');
var student      = require('./paths/students');
var permission   = require('./paths/permissions');
var role         = require('./paths/roles');
var teacher      = require('./paths/teachers');
var chair        = require('./paths/chairs');
var speciality   = require('./paths/specialities');
var login        = require('./paths/login');
var atd          = require('./paths/atd');


var app = express();

app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// -> req.body

app.use(cookieParser());
app.use(session({
    secret: config.session.secret,
    key: config.session.key,
    cookie: config.session.cookie,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    }),
    resave: true,
    saveUninitialized: true
}));
// -> req.session

// Passport:
app.use(passport.initialize());
app.use(passport.session());

var User = require('./db/models/user').User;
passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({username: username}, function(err, user) {
            if (err) {
                return done(err);
            }

            if (!user || !user.checkPassword(password)) {
                return done(null, false);
            }

            return done(null, user);
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        if (err) return done(err);
        done(null, user);
    });
});



/*
app.get('/', function(req, res, next){
    req.session.numberOfVisits = req.session.numberOfVisits + 1 || 1;
    //res.send("Visits: " + req.session.numberOfVisits);
    next();
});
*/

//app.get('/item', function(req, res) {
//    req.session.message = 'Hello World';
//    console.log(req.session);
//    res.send(req.session.message);
//});

app.post('/login', login.post);

//// permissions
//app.get('/permissions',      permission.findAll);
//app.get('/permissions/:id',  permission.findById);
//
//// roles
//app.get('/roles',            role.findAll);
//app.get('/roles/:id',        role.findById);
//
//// users
//app.get('/users',            user.findAll);
//app.get('/users/:id',        user.findById);
//
//// ? ...

// specialities
app.get('/specialities',        speciality.findAll);
app.get('/specialities/:id',    speciality.findById);
app.post('/specialities',       speciality.addSpeciality);
app.put('/specialities/:id',    speciality.updateSpeciality);
app.delete('/specialities/:id', speciality.deleteSpeciality);

// groups
app.get('/groups',              group.findAll);
app.get('/groups/:id',          group.findById);
app.post('/groups',             group.addGroup);
app.put('/groups/:id',          group.updateGroup);
app.delete('/groups/:id',       group.deleteGroup);

// students
app.get('/students',            student.findAll);
app.get('/students/:id',        student.findById);
app.post('/students',           student.addStudent);
app.put('/students/:id',        student.updateStudent);
app.delete('/students/:id',     student.deleteStudent);

// chairs
app.get('/chairs',              chair.findAll);
app.get('/chairs/:id',          chair.findById);
app.post('/chairs',             chair.addChair);
app.put('/chairs/:id',          chair.updateChair);
app.delete('/chairs/:id',       chair.deleteChair);

// teachers
app.get('/teachers',            teacher.findAll);
app.get('/teachers/:id',        teacher.findById);
app.post('/teachers',           teacher.addTeacher);
app.put('/teachers/:id',        teacher.updateTeacher);
app.delete('/teachers/:id',     teacher.deleteTeacher);

// subjects
app.get('/subjects',            subject.findAll);
app.get('/subjects/:id',        subject.findById);
app.post('/subjects',           subject.addSubject);
app.put('/subjects/:id',        subject.updateSubject);
app.delete('/subjects/:id',     subject.deleteSubject);

// attendances
app.get('/attendances',         attendance.findAll);
app.get('/attendances/:id',     attendance.findById);
app.post('/attendances',        attendance.addAttendance);
app.put('/attendances/:id',     attendance.updateAttendance);
app.delete('/attendances/:id',  attendance.deleteAttendance);


// --------------------- atd ---------------------

// get /atd?_group=5506a748382d2ab8184fc1a2&_subject=5506a748382d2ab8184fc1b5
// get /atd?_subject=5506a748382d2ab8184fc1b5

// get /atd?_group=5506a748382d2ab8184fc1a2


app.get('/atd', atd.getAtd);


//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
    res.status(404).send('unknown route');
});

var server = app.listen(config.port, config.host,  function(){
    console.log("Express server listening on %s:%s ",
        server.address().address,
        server.address().port);
});
