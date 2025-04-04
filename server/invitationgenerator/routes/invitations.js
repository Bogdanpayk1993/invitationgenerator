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
    const textSVG = Buffer.from(`<svg width="600" height="800">
                                    <defs>
                                        <style>
                                            .text {
                                                font-size: 20;
                                            }
                                        </style>
                                    </defs>
                                    <text x="50%" y="100" text-anchor="middle" class="text"> ${req['body']['invitation_details']['greeting']} ${req['body']['invitation_details']['invitees_names']} </text>
                                    <text x="50%" y="160" text-anchor="middle" class="text"> ${req['body']['invitation_details']['message']} </text>
                                    <text x="50%" y="200" text-anchor="middle" class="text"> ${req['body']['invitation_details']['who']}, ${req['body']['invitation_details']['inviting_names']}, ${req['body']['invitation_details']['body']} </text>
                                    <text x="50%" y="260" text-anchor="middle" class="text"> ${req['body']['invitation_details']['event_first_title']} </text>
                                    <text x="50%" y="300" text-anchor="middle" class="text"> Дата: ${req['body']['invitation_details']['first_date']} Час: ${req['body']['invitation_details']['first_time']} </text>
                                    <text x="50%" y="340" text-anchor="middle" class="text"> Адреса: ${req['body']['invitation_details']['first_place']} </text>
                                    <text x="50%" y="400" text-anchor="middle" class="text"> ${req['body']['invitation_details']['event_second_title']} </text>
                                    <text x="50%" y="440" text-anchor="middle" class="text"> Дата: ${req['body']['invitation_details']['second_date']} Час: ${req['body']['invitation_details']['second_time']} </text>
                                    <text x="50%" y="480" text-anchor="middle" class="text"> Адреса: ${req['body']['invitation_details']['second_place']} </text>
                                    <text x="50%" y="540" text-anchor="middle" class="text"> ${req['body']['invitation_details']['event_third_title']} </text>
                                    <text x="50%" y="580" text-anchor="middle" class="text"> Дата: ${req['body']['invitation_details']['third_date']} Час: ${req['body']['invitation_details']['third_time']} </text>
                                    <text x="50%" y="620" text-anchor="middle" class="text"> Адреса: ${req['body']['invitation_details']['third_place']} </text>
                                    <text x="50%" y="680" text-anchor="middle" class="text"> ${req['body']['invitation_details']['assurance']} </text>
                                    <text x="50%" y="720" text-anchor="middle" class="text"> ${req['body']['invitation_details']['farewell']}, ${req['body']['invitation_details']['inviting_names']}. </text>
                                 </svg>`)
    const result = await img.composite([{ input: textSVG }]).toBuffer()
    await writeFile(`${path}\\public\\images\\invitations\\res.png`, result)
})

module.exports = router;