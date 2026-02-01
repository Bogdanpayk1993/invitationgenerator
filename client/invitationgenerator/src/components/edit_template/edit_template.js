import { useEffect, useState } from "react";
import './edit_template.css';

function Edit_Template(props) {

    const invitation_text = props.invitation_text
    const set_invitation_text = props.set_invitation_text
    const img_size = props.img_size
    const styles = props.styles
    const set_client_font_size = props.set_client_font_size

    const [local_invitation_text, set_local_invitation_text] = useState()
    const [number_input, set_number_input] = useState(-1)

    let fontSize = (img_size.height / 130) * styles['size_coefficient']
    set_client_font_size(fontSize)

    function change_local_invitation_text(event, number_input) {
        let new_invitation_text = local_invitation_text.slice()

        if (event.target.value != " ") {
            new_invitation_text[number_input['i']]['text'][number_input['j']][0]['body'] = event.target.value
        } else {
            new_invitation_text[number_input['i']]['text'][number_input['j']][0]['body'] = ""
        }

        if (new_invitation_text[number_input['i']]['text'][number_input['j']][0]['type'] != "") {
            new_invitation_text.forEach((el_i, i) => (
                el_i['text'].forEach((el_j, j) => (
                    new_invitation_text[number_input['i']]['text'][number_input['j']][0]['type'] == el_j[0]['type'] ?
                        !(number_input['i'] != i && number_input['j'] != j) ?
                            event.target.value != " " ?
                                el_j[0]['body'] = event.target.value
                                :
                                el_j[0]['body'] = ""
                            :
                            null
                        : null
                ))
            ))
        }

        set_local_invitation_text(new_invitation_text)
    }

    function add_input_row(i) {
        let new_invitation_text = invitation_text.slice()
        new_invitation_text.splice(i + 1, 0, { text: [[{ body: "", type: "", placeholder: "_____", permission: true }]], offset: 0 })
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
        if (new_invitation_text[i]['offset'] == 0) {
            offset = 1
        } else {
            offset = 0
        }
        new_invitation_text[i]['offset'] = offset
        set_invitation_text(new_invitation_text)
    }

    function cancel_changes() {
        set_local_invitation_text(structuredClone(invitation_text))
    }

    function change_invitation_text() {
        set_invitation_text(structuredClone(local_invitation_text))
        set_number_input(-1)
    }

    function change_position(i, j) {
        set_number_input({ i: i, j: j })
        set_local_invitation_text(structuredClone(invitation_text))
    }

    useEffect(() => {
        if (invitation_text.label != 0) {
            set_local_invitation_text(structuredClone(invitation_text))
        }
    }, [invitation_text])

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
                                            <div>
                                                <div className="row_container">
                                                    {
                                                        invitation_text[i]['text'].map((el_j, j) => (
                                                            <p onClick={() => change_position(i, j)} style={{ fontSize: `${fontSize}px`, lineHeight: '1', fontFamily: styles['file_name'], marginLeft: `${invitation_text[i]['text'][j][0]['marginLeft']}ch`, marginBottom: `${fontSize * invitation_text[i]['offset']}px` }}> {invitation_text[i]['text'][j][0]['body'] != "" ? invitation_text[i]['text'][j][0]['body'] : invitation_text[i]['text'][j][0]['placeholder']} </p>
                                                        ))
                                                    }
                                                </div>
                                                {
                                                    number_input["i"] == i ?
                                                        <div>
                                                            <div className="menu">
                                                                {
                                                                    invitation_text[number_input["i"]]['text'][number_input["j"]][0]['permission'] == true ?
                                                                        <div>
                                                                            <input type="input" className="input" onChange={(event) => change_local_invitation_text(event, number_input)} value={local_invitation_text[number_input["i"]]['text'][number_input["j"]][0]['body']} placeholder={local_invitation_text[number_input["i"]]['text'][number_input["j"]][0]['placeholder']} />
                                                                        </div> : null
                                                                }
                                                                <input type="button" className="button" onClick={() => add_input_row(i)} value="Додати" />
                                                                {
                                                                    invitation_text[number_input["i"]]['text'][number_input["j"]][0]['permission'] == true ?
                                                                        <>
                                                                            <input type="button" className="button" onClick={() => delete_input_row(i)} value="Видалити" />
                                                                        </> : null
                                                                }
                                                                <label>
                                                                    <input type="checkbox" onChange={() => change_offset(i)} checked={local_invitation_text[i]['offset'] == 1 ? true : false} />
                                                                    Відступ
                                                                </label>
                                                                {
                                                                    invitation_text[number_input["i"]]['text'][number_input["j"]][0]['permission'] == true ?
                                                                        <>
                                                                            <input type="button" className="button" onClick={() => cancel_changes()} value="Скасувати" />
                                                                        </> : null
                                                                }
                                                                <input type="button" className="button" onClick={() => change_invitation_text()} value="Зберегти" />
                                                            </div>
                                                        </div>
                                                        : null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))
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