import React, { useState } from 'react';
import Background_Settings from '../background_settings';
import Invitation_Viewing from '../invitation_viewing';
import Settings from '../settings';
import './invitation_editor.css'

function Invitation_Editor() {

    const path_to_server = "http://localhost:8000"
    const [background_image, set_background_image] = useState("")
    const [invitation_text, set_invitation_text] = useState([])

    return (
        <>
            <div className='header'>
                <h1> Сервіс масової розсилки запрошень "Приходь" </h1>
            </div>
            <div className='invitation_editor'>
                <div className="column">
                    {
                        background_image != "" ?
                            <Settings path_to_server={path_to_server} type="wedding" background_image={background_image} invitation_text={invitation_text} set_invitation_text={set_invitation_text} />
                            : null
                    }
                </div>
                <div className="column">
                    <Invitation_Viewing path_to_server={path_to_server} background_image={background_image} invitation_text={invitation_text} set_invitation_text={set_invitation_text} />
                </div>
                <div className="column">
                    <Background_Settings path_to_server={path_to_server} type="wedding" set_background_image={set_background_image} />
                </div>
            </div>
        </>
    )
}

export default Invitation_Editor;