import React, { useState } from "react";
import './edit_template.css';

function Edit_Template(props) {

    const invitation_text = props.invitation_text
    const set_invitation_text = props.set_invitation_text

    const [number_input, set_number_input] = useState(-1)

    function change_invitation_text(event, i) {
        let new_invitation_text = invitation_text.slice()
        new_invitation_text[i]['text'] = event.target.value
        set_invitation_text(new_invitation_text)
    }

    function add_input_row(i) {
        let new_invitation_text = invitation_text.slice()
        new_invitation_text.splice(i + 1, 0, { text: "", offset: 30 })
        set_invitation_text(new_invitation_text)
    }

    function delete_input_row(i) {
        let new_invitation_text = invitation_text.slice()
        new_invitation_text.splice(i, 1)
        set_invitation_text(new_invitation_text)
        set_number_input(-1)
    }

    function change_offset(i) {
        let offset
        let new_invitation_text = invitation_text.slice()
        if (invitation_text[i]['offset'] == 30) {
            offset = 60
        } else {
            offset = 30
        }
        new_invitation_text[i]['offset'] = offset
        set_invitation_text(new_invitation_text)
    }

    function cleaning_input_row(i) {
        let new_invitation_text = invitation_text.slice()
        new_invitation_text[i]['text'] = ""
        set_invitation_text(new_invitation_text)
    }

    return (
        <div className="edit_template">
            <div className="edit_template_body">
                <div>
                    {
                        invitation_text != null ?
                            Object.keys(invitation_text).length != 0 ?
                                invitation_text.map((el, i) => (
                                    <div className={invitation_text[i]['offset'] == 60 ? "with" : "without"} >
                                        <div className="input_row">
                                            <input onClick={() => set_number_input(i)} onChange={(event) => change_invitation_text(event, i)} placeholder="____________________________" value={invitation_text[i]['text']} key={i} />
                                        </div>
                                        {
                                            number_input == i ?
                                                <div>
                                                    <div className="menu">
                                                        <input type="button" onClick={() => add_input_row(i)} value="Додати рядок" />
                                                        <input type="button" onClick={() => delete_input_row(i)} value="Видалити рядок" />
                                                        <label>
                                                            <input type="checkbox" onChange={() => change_offset(i)} checked={invitation_text[i]['offset'] == 60 ? true : false} />
                                                            Відступ
                                                        </label>
                                                        <input type="button" onClick={() => cleaning_input_row(i)} value="Відчистити рядок" /> 
                                                        <input type="button" onClick={() => set_number_input(-1)} value="Зберігти рядок" />
                                                    </div>
                                                </div>
                                                : null
                                        }
                                    </div>
                                ))
                                :
                                <button onClick={() => add_input_row(0)} > Додати рядок </button>
                            :
                            null
                    }
                </div>
            </div>
        </div>
    )
}

export default Edit_Template;