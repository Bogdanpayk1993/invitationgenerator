import React from "react";
import './edit_template.css';

function Edit_Template(props) {

    const invitation_text = props.invitation_text
    const set_invitation_text = props.set_invitation_text
    const set_edit_template_regime = props.set_edit_template_regime

    function change_invitation_text(event, i) {
        let new_invitation_text = invitation_text.slice()
        new_invitation_text[i]['text'] = event.target.value
        set_invitation_text(new_invitation_text)
    }

    return (
        <div className="edit_template">
            <div>
                {
                    invitation_text.map((el, i) => (
                        <div>
                            <input key={i} value={invitation_text[i]['text']} onChange={(event) => change_invitation_text(event, i)}/>
                        </div>
                    ))
                }
            </div>
            <div>
                <button onClick={() => set_invitation_text([])} > Відхилити зміни </button>
                <button onClick={() => set_edit_template_regime(false)}> Зберігти зміни </button>
            </div>
        </div>
    )
}

export default Edit_Template;