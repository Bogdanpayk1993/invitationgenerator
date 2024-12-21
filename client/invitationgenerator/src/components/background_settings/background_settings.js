import React, { useState } from 'react';
import Send_Request_For_Database from '../send_request_for_database/send_request_for_database';

async function get_background_images(type, set_background_images) {
    
    let reply = await Send_Request_For_Database({ link: 'background_images/getType', type:type })
    let json = JSON.parse(reply)

    let json1 = {}
    Object.entries(json).forEach(([key,value]) => {
        json1[key] = value
    })

    if (JSON.stringify(json1) !== '{}') {
        set_background_images({...json1})
    }
}

function Background_Settings(props) {
    
    const [background_images, set_background_images] = useState(NaN)
    
    if (Object.keys(background_images).length == 0) {
        get_background_images("wedding", set_background_images)
    }

    return (
        <div> 
            {
                Object.keys(background_images).length != 0 ?
                    (
                        Object.keys(background_images).map(el => (    
                            <p> {background_images[el]['name']} </p>
                        ))
                    ) : <p> There is no background images </p>
            }
        </div>
    )
}

export default Background_Settings;
