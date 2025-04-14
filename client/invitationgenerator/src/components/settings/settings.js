import React, { useState, useEffect } from "react";
import Select from "react-select";
import Send_Request_For_Database from "../send_request_for_database/send_request_for_database";
import './settings.css';

async function get_invitation_texts(path_to_server, type, set_invitation_texts) {

    let json = await Send_Request_For_Database({ link: `${path_to_server}/invitations/getType`, type: type })

    if (JSON.stringify(json) !== '{}') {

        let json1 = []

        Object.keys(json).map(el => (
            json1.push({
                value: json[el]["Id"],
                label: json[el]["name"],
                type: json[el]["type"],
                greeting: json[el]["greeting"],
                message: json[el]["message"],
                who: json[el]["who"],
                body: json[el]["body"],
                event_first_title: json[el]["eventfirsttitle"],
                event_second_title: json[el]["eventsecondtitle"],
                event_third_title: json[el]["eventthirdtitle"],
                assurance: json[el]["assurance"],
                farewell: json[el]["farewell"]
            })
        ))
        set_invitation_texts(json1)
    }
}

function Settings(props) {

    const type = props.type
    const path_to_server = props.path_to_server
    const background_image = props.background_image
    const invitation_text = props.invitation_text
    const set_invitation_text = props.set_invitation_text

    const [template_type, set_template_type] = useState("")
    const [invitation_texts, set_invitation_texts] = useState(null)

    let invitation_index = 0;

    if (invitation_texts == null) {
        get_invitation_texts(path_to_server, type, set_invitation_texts)
    }

    if (template_type == "" && invitation_texts !== null) {
        set_template_type(invitation_texts[0]["label"])
    }

    function generating_invitation_text() {
        invitation_index = invitation_texts.findIndex(el => el["label"] === template_type)

        let buf_invitation_text = []

        buf_invitation_text.push({ text: `${invitation_texts[invitation_index]['greeting']} _`, offset: 30 })

        buf_invitation_text.push({ text: `${invitation_texts[invitation_index]['message']}`, offset: 60 })
        buf_invitation_text.push({ text: `${invitation_texts[invitation_index]['who']}, _ , ${invitation_texts[invitation_index]['body']}`, offset: 30 })

        buf_invitation_text.push({ text: `${invitation_texts[invitation_index]['event_first_title']}`, offset: 60 })
        buf_invitation_text.push({ text: `_ о _`, offset: 30 })
        buf_invitation_text.push({ text: `За адресою: _`, offset: 30 })

        buf_invitation_text.push({ text: `${invitation_texts[invitation_index]['event_second_title']}`, offset: 60 })
        buf_invitation_text.push({ text: `_ о _`, offset: 30 })
        buf_invitation_text.push({ text: `За адресою: _`, offset: 30 })

        buf_invitation_text.push({ text: `${invitation_texts[invitation_index]['event_third_title']}`, offset: 60 })
        buf_invitation_text.push({ text: `_ о _`, offset: 30 })
        buf_invitation_text.push({ text: `За адресою: _`, offset: 30 })

        buf_invitation_text.push({ text: `${invitation_texts[invitation_index]['assurance']}`, offset: 60 })
        buf_invitation_text.push({ text: `${invitation_texts[invitation_index]['farewell']}, _.`, offset: 30 })

        set_invitation_text(buf_invitation_text)
    }

    async function generating_invitation() {
        let json = await Send_Request_For_Database({ link: `${path_to_server}/invitations/getInvitation`, background_image: background_image, invitation_text: invitation_text })
    }

    useEffect(() => {
        if (template_type != "") {
            generating_invitation_text()
        }
    }, [template_type])

    useEffect(() => {
        if (invitation_text == null && template_type != "") {
            generating_invitation_text()
        }
    }, [invitation_text])

    return (
        <>
            {
                invitation_texts != null ?
                    <div>
                        <div className="Text_settings">
                            <h3> Налаштування тексту </h3>
                            <div className="Input_container">
                                <label>
                                    Шаблон -
                                    <div className="Input">
                                        <Select options={invitation_texts} onChange={(event) => set_template_type(event["label"])} defaultValue={[invitation_texts[0]]} />
                                    </div>
                                </label>
                            </div>
                            <div className="Button_container">
                                <button onClick={() => set_invitation_text(null)}> Відмінити зміни шаблону </button>
                            </div>
                        </div>
                        <div className="Download_invitation">
                            <div className="Button_container"> 
                                <button onClick={() => generating_invitation()}> Завантажити запрошення </button>
                            </div>
                        </div>
                    </div>
                    :
                    null
            }
        </>
    )

}

export default Settings;