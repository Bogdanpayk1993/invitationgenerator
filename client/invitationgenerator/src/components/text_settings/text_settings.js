import React, { useState, useRef } from "react";
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

function Text_Settings(props) {

    const inviting_names = useRef()
    const invitees_names = useRef()
    const first_place = useRef()
    const first_date = useRef()
    const first_time = useRef()
    const second_place = useRef()
    const second_date = useRef()
    const second_time = useRef()
    const third_place = useRef()
    const third_date = useRef()
    const third_time = useRef()

    const type = props.type
    const path_to_server = props.path_to_server
    const background_image = props.background_image
    const [invitation_texts, set_invitation_texts] = useState("")
    const [template_type, set_template_type] = useState("")

    let invitation_index = 0;

    if (Object.keys(invitation_texts).length == 0) {
        get_invitation_texts(path_to_server, type, set_invitation_texts)
    }

    if (template_type == "" && Object.keys(invitation_texts).length !== 0) {
        set_template_type(invitation_texts[0]["label"])
    }

    async function generating_invitation() {

        invitation_index = invitation_texts.findIndex(el => el["label"] === template_type)

        let invitation_details = {
            ...invitation_texts[invitation_index],
            background_image: background_image,
            inviting_names: inviting_names.current.value,
            invitees_names: invitees_names.current.value,
            first_place: first_place.current.value,
            first_date: "27.04.2025",
            first_time: "10:00",
            second_place: second_place.current.value,
            second_date: "27.04.2025",
            second_time: "14:00",
            third_place: third_place.current.value,
            third_date: "27.04.2025",
            third_time: "18:00"
        }
        
        let json = await Send_Request_For_Database({ link: `${path_to_server}/invitations/getInvitation`, invitation_details: invitation_details })

    }

    return (
        <>
            {
                Object.keys(invitation_texts).length != 0 ?
                    <div className="Text_Settings">
                        <h3> Налаштування тексту </h3>
                        <div>
                            <div>
                                Оберіть шаблон -
                            </div>
                            <div>
                                <Select options={invitation_texts} onChange={(event) => set_template_type(event["label"])} defaultValue={[invitation_texts[0]]} />
                            </div>
                        </div>
                        <div>
                            <div>

                            </div>
                            <div>
                                <button> Редагувати шаблон </button>
                            </div>
                        </div>
                        <hr />
                        <div>
                            <div>
                                Імена запрошуючих -
                            </div>
                            <div>
                                <input value={"Сергій та Богдана"} ref={inviting_names} />
                            </div>
                        </div>
                        <div>
                            <div>
                                Імена запрошених -
                            </div>
                            <div>
                                <input value={"Юрій та Катерина"} ref={invitees_names} />
                            </div>
                        </div>
                        <hr />
                        <div>
                            <div className="Part_Name">
                                {invitation_texts[invitation_index]["event_first_title"]}
                            </div>
                        </div>
                        <div>
                            <div>
                                Адреса проведення -
                            </div>
                            <div>
                                <input value={"Ужгород"} ref={first_place} />
                            </div>
                        </div>
                        <div>
                            <div>
                                Дата -
                            </div>
                            <div>
                                <input type="date" ref={first_date} />
                            </div>
                        </div>
                        <div>
                            <div>
                                Час -
                            </div>
                            <div>
                                <input type="time" ref={first_time} />
                            </div>
                        </div>
                        <hr />
                        <div>
                            <div className="Part_Name">
                                {invitation_texts[invitation_index]["event_second_title"]}
                            </div>
                        </div>
                        <div>
                            <div>
                                Адреса проведення -
                            </div>
                            <div>
                                <input value={"Ужгород"}  ref={second_place} />
                            </div>
                        </div>
                        <div>
                            <div>
                                Дата -
                            </div>
                            <div>
                                <input type="date" ref={second_date} />
                            </div>
                        </div>
                        <div>
                            <div>
                                Час -
                            </div>
                            <div>
                                <input type="time" ref={second_time} />
                            </div>
                        </div>
                        <hr />
                        <div>
                            <div className="Part_Name">
                                {invitation_texts[invitation_index]["event_third_title"]}
                            </div>
                        </div>
                        <div>
                            <div>
                                Адреса проведення -
                            </div>
                            <div>
                                <input value={"Ужгород"}  ref={third_place} />
                            </div>
                        </div>
                        <div>
                            <div>
                                Дата -
                            </div>
                            <div>
                                <input type="date" ref={third_date} />
                            </div>
                        </div>
                        <div>
                            <div>
                                Час -
                            </div>
                            <div>
                                <input type="time" ref={third_time} />
                            </div>
                        </div>
                        <hr />
                        <div>
                            <div>

                            </div>
                            <div>
                                <button onClick={() => generating_invitation()}> Згенерувати запрошення </button>
                            </div>
                        </div>
                    </div>
                    :
                    null
            }
        </>
    )

}

export default Text_Settings;