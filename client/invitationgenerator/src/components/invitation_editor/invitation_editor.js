import React, { useState } from 'react';
import Background_Settings from '../background_settings';
import Invitation_Viewing from '../invitation_viewing';
import Edit_Template from '../edit_template/edit_template';
import Settings from '../settings';
import './invitation_editor.css'

function Invitation_Editor() {

    const path_to_server = "http://localhost:8000"
    const [background_image, set_background_image] = useState("")
    const [invitation_text, set_invitation_text] = useState([])
    const [edit_template_regime, set_edit_template_regime] = useState(false)


    return (
        <>
            <div className='header'>
                <h1> Сервіс масової розсилки запрошень "Приходь" </h1>
            </div>
            <div className='invitation_editor'>
                <div className="column">
                    <Settings background_image={background_image} path_to_server={path_to_server} type="wedding" set_edit_template_regime={set_edit_template_regime} invitation_text={invitation_text} set_invitation_text={set_invitation_text} />
                </div>
                <div className="column">
                    <Invitation_Viewing path_to_server={path_to_server} background_image={background_image} />
                </div>
                <div className="column">
                    <Background_Settings path_to_server={path_to_server} type="wedding" set_background_image={set_background_image} />
                </div>
            </div>
            {
                edit_template_regime == true ?
                    <div>
                        <Edit_Template invitation_text={invitation_text} set_invitation_text={set_invitation_text} set_edit_template_regime={set_edit_template_regime}  />
                    </div>
                    :
                    null
            }
        </>
    )
}

export default Invitation_Editor;