import React from "react";
import Text_Settings from "../text_settings/text_settings";
import './settings.css';

function Settings(props) {

    const type = props.type
    const path_to_server = props.path_to_server
    const background_image = props.background_image
    const invitation_text = props.invitation_text
    const set_invitation_text = props.set_invitation_text

    return (
        background_image != "" ?
        <>         
            <div className="settings">
                <Text_Settings background_image={background_image} path_to_server={path_to_server} type={type} invitation_text={invitation_text} set_invitation_text={set_invitation_text} />
            </div>
            <div className="settings">
                <h3> Отримання запрошення </h3>
            </div>
        </>
        :
        null
    )
}

export default Settings;