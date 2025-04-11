import React, { useState } from "react";
import './edit_template.css';

function Edit_Template(props) {

    const invitation_text = props.invitation_text
    const set_invitation_text = props.set_invitation_text
    const set_edit_template_regime = props.set_edit_template_regime

    const [number_input, set_number_input] = useState(-1)

    function change_invitation_text(event, i) {
        let new_invitation_text = invitation_text.slice()
        new_invitation_text[i]['text'] = event.target.value
        set_invitation_text(new_invitation_text)
    }

    function cancel_changes() {
        set_invitation_text([])
        set_number_input(-1)
    }

    return (
        <div className="edit_template">
            <div className="edit_template_menu">
                <div>
                    <button onClick={() => cancel_changes()}> Відхилити зміни </button>
                </div>
                <div>
                    <button onClick={() => set_edit_template_regime(false)}> Зберігти зміни </button>
                </div>
            </div>
            <div className="edit_template_container">
                {
                    invitation_text.map((el, i) => (
                        <div className={invitation_text[i]['offset'] == 60 ? "with" : "without"} >
                            <div className="input_row">
                                <input onClick={() => set_number_input(i)} onChange={(event) => change_invitation_text(event, i)} value={invitation_text[i]['text']} key={i} />
                            </div>
                            {
                                number_input == i ?
                                    <div>
                                        <div className="menu">
                                            <input type="button" value="Додати" />
                                            <input type="button" value="Видалити" />
                                            <input type="checkbox" checked={invitation_text[i]['offset'] == 60 ? true : false} /> <label> Відступ </label>
                                        </div>
                                    </div>
                                    : null
                            }
                        </div>
                    ))
                }
            </div>
            <div className="closed_menu">
                {
                    number_input != -1 ?
                        <button onClick={() => set_number_input(-1)} > Приховати меню </button>
                        : null
                }
            </div>
        </div>
    )
}

export default Edit_Template;