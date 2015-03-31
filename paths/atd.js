var atdModule = require('../sys_modules/atdModule.js');

exports.getAtd = function(req, res) {
    var groupId = req.query._group;
    var subjectId = req.query._subject;

    if (!groupId && !subjectId) {
        res.status(404).send("_group or/and _subject parameters needed");

    } else if (groupId && subjectId) {
        atdModule.groupJournal(req.query, function (err, data) {
            if (err || !data) {
                if (err) console.log(err.toString());
                res.sendStatus(404);
            }

            res.json(data);
        });

    } else if (groupId) {
        atdModule.groupStats(groupId, function(err, data) {
            if (err || !data) {
                if (err) console.log(err.toString());
                res.sendStatus(404);
            }

            res.json(data);
        });

    } else if (subjectId) {
        atdModule.subjectJournal(subjectId, function(err, data) {
            if (err || !data) {
                if (err) console.log(err.toString());
                res.sendStatus(404);
            }

            res.json(data);
        });
    }
};