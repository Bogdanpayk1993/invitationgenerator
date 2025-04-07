import React from "react";
import './edit_template.css';

function Edit_Template(props) {

    const invitation_text = props.invitation_text
    const set_invitation_text = props.set_invitation_text
    const set_edit_template_regime = props.set_edit_template_regime

    return (
        <div className="edit_template"> 
            <div>

            </div>
            <div>
                <button onClick={() => set_edit_template_regime(false)} > Скасувати </button>
                <button> Зберігти </button>
            </div>
        </div>
    )
}

export default Edit_Template;