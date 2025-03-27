var express = require('express');
var router = express.Router();
var BetterSqlite3 = require('better-sqlite3');
var db = new BetterSqlite3('invitation.db');

var fsPromises = require('fs/promises');
var readFile = fsPromises.readFile;
var writeFile = fsPromises.writeFile;

var appRootPath = require('app-root-path');
var path = appRootPath.path;

var sharp = require('sharp');  

router.post('/getType', function (req, res) {
    const result = db.prepare(`SELECT * FROM invitations WHERE type='${req['body']['type']}'`).all()
    res.send(result)
})

router.post('/getInvitation', async function (req, res) {
    const file = await readFile(`${path}\\public\\images\\backgrounds\\${req['body']['invitation_details']['background_image']}`)
    const img = sharp(file)
    const textSVG = Buffer.from(`<svg width="500" height="700">
                        <text x="50%" y="30" text-anchor="middle"> ${req['body']['invitation_details']['greeting']} ${req['body']['invitation_details']['invitees_names']} </text>
                        <text x="50%" y="60" text-anchor="middle"> ${req['body']['invitation_details']['message']} </text>
                        <text x="50%" y="90" text-anchor="middle"> ${req['body']['invitation_details']['who']}, ${req['body']['invitation_details']['inviting_names']}, ${req['body']['invitation_details']['body']} </text>
                        <text x="50%" y="120" text-anchor="middle"> ${req['body']['invitation_details']['event_title']} </text>
                        <text x="50%" y="150" text-anchor="middle"> Дата: ${req['body']['invitation_details']['first_date']} Час: ${req['body']['invitation_details']['first_time']} Місце: ${req['body']['invitation_details']['first_place']}  </text>
                        <text x="50%" y="180" text-anchor="middle"> ${req['body']['invitation_details']['party_title']} </text>
                        <text x="50%" y="210" text-anchor="middle"> Дата: ${req['body']['invitation_details']['second_date']} Час: ${req['body']['invitation_details']['second_time']} Місце: ${req['body']['invitation_details']['second_place']}  </text>
                        <text x="50%" y="240" text-anchor="middle"> ${req['body']['invitation_details']['assurance']} </text>
                        <text x="50%" y="270" text-anchor="middle"> ${req['body']['invitation_details']['farewell']}, ${req['body']['invitation_details']['inviting_names']}. </text>
                    </svg>`)
    const result = await img.composite([{ input: textSVG }]).toBuffer()
    await writeFile(`${path}\\public\\images\\invitations\\res.png`, result)
})

module.exports = router;