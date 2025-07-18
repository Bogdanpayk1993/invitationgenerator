import { useState } from "react";
import './edit_template.css';

function Edit_Template(props) {

    const template_type = props.template_type
    const invitation_text = props.invitation_text
    const set_invitation_text = props.set_invitation_text

    const [number_input, set_number_input] = useState(-1)

    function change_invitation_text(event, number_input) {
        let new_invitation_text = invitation_text.slice()
        if (event.target.value != " ") {
            new_invitation_text[number_input['i']]['text'][number_input['j']][0]['body'] = event.target.value
        } else {
            new_invitation_text[number_input['i']]['text'][number_input['j']][0]['body'] = ""
        }

        if (new_invitation_text[number_input['i']]['text'][number_input['j']][0]['type'] != "") {
            for (let i = 0; i < new_invitation_text.length; i++) {
                for (let j = 0; j < new_invitation_text[i]['text'].length; j++) {
                    if (new_invitation_text[i]['text'][j][0]['type'] != "") {
                        if (number_input['i'] != i || number_input['j'] != j) {
                            if (event.target.value != " ") {
                                new_invitation_text[i]['text'][j][0]['body'] = event.target.value
                            } else {
                                new_invitation_text[i]['text'][j][0]['body'] = ""
                            }
                        }
                    }
                }
            }
        }

        set_invitation_text(new_invitation_text)
    }

    function add_input_row(i) {
        let new_invitation_text = invitation_text.slice()
        new_invitation_text.splice(i + 1, 0, { text: [[{ body: "", placeholder: "_____", permission: true }]], offset: 25 })
        set_invitation_text(new_invitation_text)
        set_number_input(i + 1)
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

    function cleaning_input_row(i, j) {
        let new_invitation_text = invitation_text.slice()
        new_invitation_text[i]['text'][j][0]['body'] = ""

        if (new_invitation_text[number_input['i']]['text'][number_input['j']][0]['type'] != "") {
            for (var k = 0; k < new_invitation_text.length; k++) {
                for (var l = 0; l < new_invitation_text[k]['text'].length; l++) {
                    if (new_invitation_text[k]['text'][l][0]['type'] != "") {
                        if (number_input['i'] != k || number_input['j'] != l) {
                            new_invitation_text[k]['text'][l][0]['body'] = ""
                        }
                    }
                }
            }
        }

        set_invitation_text(new_invitation_text)
        set_number_input({ i: i, j: j })
    }

    return (
        <div className="edit_template">
            <div className="edit_template_body">
                <div>
                    {
                        invitation_text != null ?
                            Object.keys(invitation_text).length != 0 ?
                                invitation_text.map((el_i, i) => (
                                    <div>
                                        <div className="row">
                                            <div className={invitation_text[i]['offset'] == 60 ? "with" : "without"}>
                                                <div>
                                                    {
                                                        invitation_text[i]['text'].map((el_j, j) => (
                                                            <span onClick={() => invitation_text[i]['text'][j][0]['permission'] == true ? set_number_input({ i: i, j: j }) : set_number_input(-1)}>{invitation_text[i]['text'][j][0]['body'] != "" ? invitation_text[i]['text'][j][0]['body'] : invitation_text[i]['text'][j][0]['placeholder']}</span>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                            {
                                                number_input["i"] == i ?
                                                    <div>
                                                        <div className="menu">
                                                            <div>
                                                                <input type="input" className="input" onChange={(event) => change_invitation_text(event, number_input)} value={invitation_text[number_input["i"]]['text'][number_input["j"]][0]['body']} placeholder={invitation_text[number_input["i"]]['text'][number_input["j"]][0]['placeholder']} />
                                                            </div>
                                                            <input type="button" onClick={() => add_input_row(i)} value="Додати" />
                                                            <input type="button" onClick={() => delete_input_row(i)} value="Видалити" />
                                                            <label>
                                                                <input type="checkbox" onChange={() => change_offset(i)} checked={invitation_text[i]['offset'] == 60 ? true : false} />
                                                                Відступ
                                                            </label>
                                                            <input type="button" onClick={() => cleaning_input_row(number_input["i"], number_input["j"])} value="Відчистити" />
                                                            <input type="button" onClick={() => set_number_input(-1)} value="Зберегти" />
                                                        </div>
                                                    </div>
                                                    : null
                                            }
                                        </div>
                                    </div>
                                ))
                                :
                                template_type != "" ?
                                    <button onClick={() => add_input_row(0)} > Додати рядок </button>
                                    :
                                    <p> Оберіть тип шаблону </p>
                            :
                            null
                    }
                </div>
            </div>
        </div>
    )
}

export default Edit_Template;