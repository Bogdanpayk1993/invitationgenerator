import React, { useState } from 'react';
import Background_Settings from '../background_settings';
import Invitation_Viewing from '../invitation_viewing';
import Text_Settings from '../text_settings/text_settings';
import './invitation_editor.css'

function Invitation_Editor() {

    const path_to_server = "http://localhost:8000"
    const [background_image, set_background_image] = useState("")

    return (
        <>
            <div className='header'>
                <h1> Сервіс масової розсилки запрошень "Приходь" </h1>
            </div>
            <diw>
                <div className="column">
                    <Text_Settings background_image={background_image} set_background_image={set_background_image} />
                </div>
                <div className="column">
                    <Invitation_Viewing background_image={background_image} />
                </div>
                <div className="column">
                    <Background_Settings path_to_server={path_to_server} type="wedding" set_background_image={set_background_image} />
                </div>
            </diw>
        </>
    )
}

export default Invitation_Editor;