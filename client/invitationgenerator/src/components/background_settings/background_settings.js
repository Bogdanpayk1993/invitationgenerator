import React, { useState } from 'react';
import Send_Request_For_Database from '../send_request_for_database/send_request_for_database';
import './background_settings.css';

async function get_background_images(path_to_server, type, set_background_images) {

    let json = await Send_Request_For_Database({ link: `${path_to_server}/background_images/getType`, type: type })

    if (JSON.stringify(json) !== '{}') {
        set_background_images({ ...json })
    }
}

function Background_Settings(props) {

    const type = props.type
    const path_to_server = props.path_to_server
    const [background_images, set_background_images] = useState(NaN)

    if (Object.keys(background_images).length == 0) {
        get_background_images(path_to_server, type, set_background_images)
    }

    return (
        <div>
            {
                Object.keys(background_images).length != 0 ?
                    (
                        Object.keys(background_images).map(el => (
                            <>
                                <img src={`${path_to_server}/images/${background_images[el]['name']}.jpg`} className='background_settings' />
                            </>
                        ))
                    ) : <p> There is no background images </p>
            }
        </div>
    )
}

export default Background_Settings;
