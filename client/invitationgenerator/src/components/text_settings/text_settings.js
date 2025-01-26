import React, { useState, useId } from "react";
import Send_Request_For_Database from "../send_request_for_database/send_request_for_database";
import './text_settings.css';

async function get_invitation_texts(path_to_server, type, set_invitation_texts) {
    
    let json = await Send_Request_For_Database({ link: `${path_to_server}/invitations/getType`, type: type}) 

    if (JSON.stringify(json) !== '{}') {
        set_invitation_texts({ ...json })
    }
}

function Text_Settings(props) {

    const type = props.type 
    const path_to_server = props.path_to_server
    const background_image = props.background_image
    const [invitation_texts, set_invitation_texts] = useState("")

    if (Object.keys(invitation_texts).length == 0) {
        get_invitation_texts(path_to_server, type, set_invitation_texts)
    }

    return (
        <>

        </>
    )

}

export default Text_Settings;