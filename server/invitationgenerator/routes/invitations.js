var express = require('express');
var router = express.Router();
var BetterSqlite3 = require('better-sqlite3');
var db = new BetterSqlite3('invitation.db');

router.post('/getType', function (req, res) {
    const result = db.prepare(`SELECT * FROM invitations WHERE type='${req['body']['type']}'`).all()
    res.send(result)
})

module.exports = router;