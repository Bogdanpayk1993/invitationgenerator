import React, { useState } from 'react';
import Get_data_from_server from '../get_data_from_server/get_data_from_server';
import './background_settings.css';

async function get_background_images(path_to_server, type, set_background_image, set_background_images) {

    let json = await Get_data_from_server({ link: `${path_to_server}/background_images/getType`, type: type })

    if (JSON.stringify(json) !== '{}') {
        set_background_images({ ...json })
        set_background_image(`${json[0]['name']}.jpg`)
    }
}

function Background_Settings(props) {

    const type = props.type
    const path_to_server = props.path_to_server
    const set_background_image = props.set_background_image
    const [background_images, set_background_images] = useState("")

    if (Object.keys(background_images).length == 0) {
        get_background_images(path_to_server, type, set_background_image, set_background_images)
    }

    return (
        <>
            <h3> Налаштування фону </h3>
            <div className='background_settings'>
                {
                    Object.keys(background_images).length != 0 ?
                        (
                            Object.keys(background_images).map(el => (
                                <>
                                    <img src={`${path_to_server}/images/backgrounds/${background_images[el]['name']}.jpg`} className='background_images' onClick={() => set_background_image(`${background_images[el]['name']}.jpg`)} />
                                </>
                            ))
                        ) : <p> Немає фонових зображень </p>
                }
            </div>
        </>
    )
}

export default Background_Settings;
