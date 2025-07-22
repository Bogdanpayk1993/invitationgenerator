import { useState } from 'react';
import Background_Settings from '../background_settings';
import Invitation_Viewing from '../invitation_viewing';
import Settings from '../settings';
import './invitation_editor.css'

function Invitation_Editor() {

    const path_to_server = "http://localhost:8000"
    const [background_image, set_background_image] = useState("")
    const [template_type, set_template_type] = useState("")
    const [invitation_text, set_invitation_text] = useState([])
    const [list_names, set_list_names] = useState([])

    return (
        <>
            <div className='header'>
                <h1> Сервіс масової генерації запрошень "Приходь" </h1>
            </div>
            <div className='invitation_editor'>
                <div className="column">
                    {
                        background_image != "" ?
                            <Settings path_to_server={path_to_server} type="wedding" background_image={background_image} template_type={template_type} set_template_type={set_template_type} invitation_text={invitation_text} set_invitation_text={set_invitation_text} list_names={list_names} set_list_names={set_list_names} />
                            : null
                    }
                </div>
                <div className="column">
                    <Invitation_Viewing path_to_server={path_to_server} background_image={background_image} template_type={template_type} invitation_text={invitation_text} set_invitation_text={set_invitation_text} />
                </div>
                <div className="column">
                    <Background_Settings path_to_server={path_to_server} type="wedding" set_background_image={set_background_image} />
                </div>
            </div>
        </>
    )
}

export default Invitation_Editor;