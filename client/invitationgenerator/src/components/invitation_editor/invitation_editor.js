import { useState } from 'react';
import Settings from '../settings';
import Invitation_Viewing from '../invitation_viewing/invitation_viewing';
import Background_Settings from '../background_settings/background_settings';
import './invitation_editor.css'

function Invitation_Editor() {

    const path_to_server = "http://localhost:8000"
    
    const [background_image, set_background_image] = useState("")
    const [invitation_text, set_invitation_text] = useState([])
    const [greetings_list, set_greetings_list] = useState(["Дорогі Юрій та Катерина"])
    const [styles, set_styles] = useState({})
    const [client_height, set_client_height] = useState({})
    const [client_font_size, set_client_font_size] = useState({})

    return (
        <>
            <div className='header'>
                <h1> Сервіс масової генерації запрошень "Приходь" </h1>
            </div>
            <div className='invitation_editor'>
                <div className="column">
                    {
                        background_image != "" ?
                            <Settings path_to_server={path_to_server} type="wedding" background_image={background_image} invitation_text={invitation_text} set_invitation_text={set_invitation_text} greetings_list={greetings_list} set_greetings_list={set_greetings_list} styles={styles} set_styles={set_styles} client_height={client_height} client_font_size={client_font_size} />
                            : null
                    }
                </div>
                <div className="column">
                    <Invitation_Viewing path_to_server={path_to_server} background_image={background_image} invitation_text={invitation_text} set_invitation_text={set_invitation_text} styles={styles} set_client_height={set_client_height} set_client_font_size={set_client_font_size} />
                </div>
                <div className="column">
                    <Background_Settings path_to_server={path_to_server} type="wedding" set_background_image={set_background_image} />
                </div>
            </div>
        </>
    )
}

export default Invitation_Editor;