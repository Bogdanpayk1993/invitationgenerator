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
    let position = 0
    let height = 0 
    req['body']['invitation_text'].forEach(el => (
        height += el['offset']
    ))
    height += 5
    const file = await readFile(`${path}\\public\\images\\backgrounds\\${req['body']['background_image']}`)
    const img = sharp(file)
    const textSVG = Buffer.from(`<svg width="600" height="${height}">
                                    <defs>
                                        <style>
                                            .text {
                                                font-size: 20pt;
                                            }
                                        </style>
                                    </defs>
                                    ${
                                        req['body']['invitation_text'].map(el =>
                                           `<text x="50%" y="${position += el['offset']}" text-anchor="middle" class="text"> ${el['text']} </text>`
                                        )
                                    }
                                </svg>`)
    const result = await img.composite([{ input: textSVG }]).toBuffer()
    await writeFile(`${path}\\public\\images\\invitations\\res.jpg`, result)
    res.send(Buffer.from(result))
})

module.exports = router;