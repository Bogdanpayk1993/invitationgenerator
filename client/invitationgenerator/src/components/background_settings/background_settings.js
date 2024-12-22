import React, { useState } from 'react';
import Send_Request_For_Database from '../send_request_for_database/send_request_for_database';
import './background_settings.css';

async function get_background_images(type, set_background_images) {

    let reply = await Send_Request_For_Database({ link: 'background_images/getType', type: type })
    let json = JSON.parse(reply)

    let json1 = {}
    Object.entries(json).forEach(([key, value]) => {
        json1[key] = value
    })

    if (JSON.stringify(json1) !== '{}') {
        set_background_images({ ...json1 })
    }
}

function Background_Settings(props) {

    const type = props.type
    const [background_images, set_background_images] = useState(NaN)

    if (Object.keys(background_images).length == 0) {
        get_background_images(type, set_background_images)
    }

    return (
        <div>
            {
                Object.keys(background_images).length != 0 ?
                    (
                        Object.keys(background_images).map(el => (
                            <>
                                <img src={`http://localhost:8000/images/${background_images[el]['name']}.jpg`} className='background_settings' />
                            </>
                        ))
                    ) : <p> There is no background images </p>
            }
        </div>
    )
}

export default Background_Settings;
