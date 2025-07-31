import { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import Select from "react-select";
import Get_data_from_server from '../get_data_from_server/get_data_from_server';
import Get_file_from_server from "../get_file_from_server/get_file_from_server";
import Greetings_list_control from "../greetings_list_control";
import './settings.css';

async function get_invitation_texts(path_to_server, type, set_invitation_texts) {

    let json = await Get_data_from_server({ link: `${path_to_server}/invitations/getType`, type: type })

    if (JSON.stringify(json) !== '{}') {
        let json1 = []

        Object.keys(json).forEach(el => (
            json1.push({
                value: json[el]["Id"],
                label: json[el]["name"],
                type: json[el]["type"],
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

        json1.push({ value: Object.keys(json).length + 1, label: "Професійний" })

        set_invitation_texts(json1)
    }
}

function Settings(props) {

    const type = props.type
    const path_to_server = props.path_to_server
    const background_image = props.background_image
    const invitation_text = props.invitation_text
    const set_invitation_text = props.set_invitation_text
    const greetings_list = props.greetings_list
    const set_greetings_list = props.set_greetings_list

    const [template_type, set_template_type] = useState("")
    const [invitation_texts, set_invitation_texts] = useState(null)
    const [permission_generating_invitations, set_permission_generating_invitations] = useState(false)

    if (invitation_texts == null) {
        get_invitation_texts(path_to_server, type, set_invitation_texts)
    }

    function generating_invitation_text() {
        if (template_type != "Професійний") {
            let invitation_index = invitation_texts.findIndex(el => el["label"] === template_type)

            let buf_invitation_text = []

            buf_invitation_text.push({ text: [[{ body: greetings_list.length != 0 ? greetings_list[0] : "", type: "", placeholder: "(звернення до групи запрошених)", permission: false }]], offset: 25 })

            buf_invitation_text.push({ text: [[{ body: invitation_texts[invitation_index]['message'], type: "", placeholder: "_____", permission: true }]], offset: 60 })
            buf_invitation_text.push({ text: [[{ body: `${invitation_texts[invitation_index]['who']}, `, type: "", placeholder: "_____", permission: true }], [{ body: "", type: "inviting_names", placeholder: "(імена запрошуючих)", permission: true }], [{ body: `, ${invitation_texts[invitation_index]['body']}`, type: "", placeholder: "_____", permission: true }]], offset: 25 })

            buf_invitation_text.push({ text: [[{ body: invitation_texts[invitation_index]['event_first_title'], type: "", placeholder: "_____", permission: true }]], offset: 60 })
            buf_invitation_text.push({ text: [[{ body: "", type: "", placeholder: "(дата)", permission: true }], [{ body: " о ", type: "", placeholder: "_____", permission: true }], [{ body: "", type: "", placeholder: "(час)", permission: true }]], offset: 25 })
            buf_invitation_text.push({ text: [[{ body: "За адресою: ", type: "", placeholder: "_____", permission: true }], [{ body: "", type: "", placeholder: "(адреса)", permission: true }]], offset: 25 })

            buf_invitation_text.push({ text: [[{ body: invitation_texts[invitation_index]['event_second_title'], type: "", placeholder: "_____", permission: true }]], offset: 60 })
            buf_invitation_text.push({ text: [[{ body: "", type: "", placeholder: "(дата)", permission: true }], [{ body: " о ", type: "", placeholder: "_____", permission: true }], [{ body: "", type: "", placeholder: "(час)", permission: true }]], offset: 25 })
            buf_invitation_text.push({ text: [[{ body: "За адресою: ", type: "", placeholder: "_____", permission: true }], [{ body: "", type: "", placeholder: "(адреса)", permission: true }]], offset: 25 })

            buf_invitation_text.push({ text: [[{ body: invitation_texts[invitation_index]['event_third_title'], type: "", placeholder: "_____", permission: true }]], offset: 60 })
            buf_invitation_text.push({ text: [[{ body: "", placeholder: "(дата)", type: "", permission: true }], [{ body: " о ", type: "", placeholder: "_____", permission: true }], [{ body: "", type: "", placeholder: "(час)", permission: true }]], offset: 25 })
            buf_invitation_text.push({ text: [[{ body: "За адресою: ", type: "", placeholder: "_____", permission: true }], [{ body: "", type: "", placeholder: "(адреса)", permission: true }]], offset: 25 })

            buf_invitation_text.push({ text: [[{ body: invitation_texts[invitation_index]['assurance'], type: "", placeholder: '_____', permission: true }]], offset: 60 })
            buf_invitation_text.push({ text: [[{ body: `${invitation_texts[invitation_index]['farewell']}, `, type: "", placeholder: "_____", permission: true }], [{ body: "", type: "inviting_names", placeholder: "(імена запрошуючих)", permission: true }], [{ body: ".", type: "", placeholder: "_____", permission: false }]], offset: 25 })

            set_invitation_text(buf_invitation_text)
        } else {
            let buf_invitation_text = []

            buf_invitation_text.push({ text: [[{ body: greetings_list.length != 0 ? greetings_list[0] : "", type: "", placeholder: "(звернення до групи запрошених)", permission: false }]], offset: 25 })
            buf_invitation_text.push({ text: [[{ body: "", type: "", placeholder: "_____", permission: true }]], offset: 60 })

            set_invitation_text(buf_invitation_text)
        }
    }

    function get_permission_generating_invitations() {
        let permission = true

        invitation_text.forEach((el_i) => (
            el_i['text'].forEach((el_j) => (
                el_j[0]['body'] == "" ?
                    permission = false
                    :
                    null
            ))
        ))

        set_permission_generating_invitations(permission)
    }

    async function generating_invitation() {
        let buf_invitation_text = []

        invitation_text.forEach((el_i, i) => (
            buf_invitation_text[i] = "",
            el_i['text'].forEach((el_j, j) => (
                buf_invitation_text[i] += el_j[0]['body']
            )),
            buf_invitation_text[i] = { text: buf_invitation_text[i], offset: el_i['offset'] }
        ))

        let json = await Get_file_from_server({ link: `${path_to_server}/invitations/getInvitation`, background_image: background_image, invitation_text: buf_invitation_text, folder_name: invitation_text[2]['text'][1][0]['body'], greetings_list: greetings_list })
        saveAs(`${path_to_server}/${json}`)
    }

    useEffect(() => {
        if (template_type != "") {
            generating_invitation_text()
        }
    }, [template_type])

    useEffect(() => {
        if (template_type != "" && invitation_text == null) {
            generating_invitation_text()
        } else {
            if (Object.keys(invitation_text).length == 0 && template_type != "") {
                set_template_type('Професійний')
            }
        }
        get_permission_generating_invitations()
    }, [invitation_text])

    useEffect(() => {
        if (template_type != "") {
            generating_invitation_text()
        }
    }, [greetings_list[0]])

    return (
        <>
            {
                invitation_texts != null ?
                    <div>
                        <div className="Text_settings">
                            <h3> Налаштування шаблону </h3>
                            <div className="Input_container">
                                <Select options={invitation_texts} onChange={(event) => set_template_type(event["label"])} placeholder="Оберіть тип" value={invitation_texts[invitation_texts.findIndex(el => el["label"] === template_type)]} />
                            </div>
                            {
                                template_type != "" ?
                                    <>
                                        <div className="Button_container">
                                            <button onClick={() => generating_invitation_text(null)}> Відмінити зміни шаблону </button>
                                        </div>
                                        <div className="Name_container">
                                            <Greetings_list_control greetings_list={greetings_list} set_greetings_list={set_greetings_list} />
                                        </div>
                                    </> : null
                            }
                        </div>
                        {
                            template_type != "" ?
                                <>
                                    <div className="Style_settings">

                                    </div>
                                    {
                                        greetings_list.length != 0 && permission_generating_invitations != false ?
                                            <div className="Button_container">
                                                <button onClick={() => generating_invitation()}> Завантажити {greetings_list.length} запрошення </button>
                                            </div>
                                            : null
                                    }
                                </> : null
                        }
                    </div>
                    :
                    null
            }
        </>
    )

}

export default Settings;