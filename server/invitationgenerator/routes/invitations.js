var express = require('express');
var router = express.Router();
var BetterSqlite3 = require('better-sqlite3');
var db = new BetterSqlite3('database/invitation.db');

var fs = require('fs');
var existsSync = fs.existsSync
var fsPromises = require('fs/promises');
var mkdir = fsPromises.mkdir;
var readFile = fsPromises.readFile;
var writeFile = fsPromises.writeFile;

var appRootPath = require('app-root-path');
var path = appRootPath.path;

var sharp = require('sharp');
var JSZip = require('jszip');

router.post('/getType', function (req, res) {
    const result = db.prepare(`SELECT * FROM invitations WHERE type='${req['body']['type']}'`).all()
    res.send(result)
})

router.post('/getInvitations', async function (req, res) {

    let date = new Date()
    let folder_name = `invitations_${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}_${date.getMilliseconds}`
    let counter = 1

    while (existsSync(`${path}/public/images/invitations/${folder_name}_${counter}`)) {
        counter++
    }

    let full_folder_name = `${folder_name}_${counter}`

    mkdir(`${path}/public/images/invitations/${full_folder_name}/`).then(() => {
    }).catch((err) => {
        console.log(err)
    })

    const file = await readFile(`${path}\\public\\images\\backgrounds\\${req['body']['background_image']}`)

    const img = sharp(file)
    const metadata = await img.metadata()
    const img_width = metadata.width
    const img_height = metadata.height

    let text_height = 0
    req['body']['invitation_text'].forEach(el => (
        text_height += ((img_height / 100) * el['offset']) + (((img_width / 100) * 3) * 1.2)
    ))
    text_height += 5

    var zip = new JSZip()
    var invitationPaths = []

    for (let i = 0; i < req['body']['greetings_list'].length; i++) {
        let position = 0

        let invitation_name = req['body']['greetings_list'][i].replaceAll(" ", "_")

        req['body']['invitation_text'][0]['text'] = req['body']['greetings_list'][i]

        let font_size = (img_width / 100) * 3

        const textSVG = Buffer.from(`<svg width="${img_width}" height="${text_height}">
                                    <defs>
                                        <style>
                                            .text {
                                                font-size: ${font_size}px;
                                                font-family: 'Times New Roman', Times, serif;
                                            }
                                        </style>
                                    </defs>
                                    ${req['body']['invitation_text'].map(el => `<text x="50%" y="${position += ((img_height / 100) * el['offset']) + (((img_width / 100) * 3) * 1.2)}" text-anchor="middle" class="text"> ${el['text']} </text>`)}
                                    </svg>`)

        const result = await img.composite([{ input: textSVG }]).toBuffer()
        await writeFile(`${path}\\public\\images\\invitations\\${full_folder_name}\\${invitation_name}.jpg`, result)
        invitationPaths.push(`${path}\\public\\images\\invitations\\${full_folder_name}\\${invitation_name}.jpg`)
    }

    invitationPaths.forEach((el, i) => {
        const invitationData = fs.readFileSync(el)
        const fileName = `invitations\\${req['body']['greetings_list'][i]}.jpg`
        zip.file(fileName, invitationData)
    })

    zip.generateAsync({ type: 'nodebuffer' })
        .then(el => {
            fs.writeFileSync(`${path}\\public\\images\\invitations\\${full_folder_name}\\${full_folder_name}.zip`, el)
        })
        .then(() => {
            const filePath = `${path}\\public\\images\\invitations\\${full_folder_name}\\${full_folder_name}.zip`
            const fileStream = fs.createReadStream(filePath)

            res.setHeader('Content-Disposition', 'attachment; filename="invitations.zip"')
            res.setHeader('Content-Type', 'application/zip')

            fileStream.pipe(res)
        })
        .then(() => {
            fs.rm(`${path}\\public\\images\\invitations\\${full_folder_name}`, { recursive: true, force: true }, err => {
                if (err) {
                    console.error('Помилка видалення: ', err);
                }
            })
        })
})

module.exports = router;