import React, { useState, useId } from "react";
import Select from "react-select";
import Send_Request_For_Database from "../send_request_for_database/send_request_for_database";
import './text_settings.css';

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
                body: json[el]["body"],
                event_title: json[el]["eventtitle"],
                party_title: json[el]["partytitle"],
                assurance: json[el]["assurance"],
                farewell: json[el]["farewell"]
            })
        ))

        set_invitation_texts(json1)
    }
}

function Text_Settings(props) {

    const type = props.type
    const path_to_server = props.path_to_server
    const [invitation_texts, set_invitation_texts] = useState("")

    if (Object.keys(invitation_texts).length == 0) {
        get_invitation_texts(path_to_server, type, set_invitation_texts)
    }

    console.log(invitation_texts)

    return (
        <>
            {
                Object.keys(invitation_texts).length != 0 ?
                    <div className="Text_Settings">
                        <div>
                            Оберіть шаблон -
                        </div>
                        <div>
                            <Select options={invitation_texts} defaultValue={[invitation_texts[0]]} className="Select" />
                        </div>
                        <div>

                        </div>
                        <div>
                            <button> Редагувати шаблон </button>
                        </div>
                        <hr />
                        <div>
                            Імена запрошуючих -
                        </div>
                        <div>
                            <input />
                        </div>
                        <div>
                            Імена запрошених -
                        </div>
                        <div>
                            <input />
                        </div>
                        <hr />
                        <div>
                            Місце офіційної частини -
                        </div>
                        <div>
                            <input />
                        </div>
                        <div>
                            Дата офіційної частини -
                        </div>
                        <div>
                            <input />
                        </div>
                        <hr />
                        <div>
                            Місце банкету -
                        </div>
                        <div>
                            <input />
                        </div>
                        <div>
                            Дата банкету -
                        </div>
                        <div>
                            <input />
                        </div>
                        <hr />
                        <div>

                        </div>
                        <div>
                            <button> Згенерувати запрошення </button>
                        </div>
                    </div>
                    :
                    null
            }
        </>
    )

}

export default Text_Settings;