var express = require('express');
var router = express.Router();
var BetterSqlite3 = require('better-sqlite3');
var db = new BetterSqlite3('database/invitation.db');

router.post('/getType', function (req, res) {
    const result = db.prepare(`SELECT * FROM background_images WHERE type='${req['body']['type']}'`).all()
    res.send(result)
})

module.exports = router;