import { useState } from 'react';
import Select from 'react-select';
import Get_data_from_server from '../get_data_from_server/get_data_from_server';
import './style_settings.css';

function Style_Settings(props) {

    const path_to_server = props.path_to_server
    const template_type = props.template_type
    const styles = props.styles
    const set_styles = props.set_styles

    const [fonts, set_fonts] = useState([])

    if (fonts.length == 0) {
        get_fonts(path_to_server, set_fonts)
    }

    async function get_fonts(path_to_server, set_fonts) {
        
        let json = await Get_data_from_server({ link: `${path_to_server}/fonts/getFonts` })

        if (JSON.stringify(json) !== '{}') {
            let json1 = []

            Object.keys(json).forEach(el => (
                json1.push({
                    value: json[el]["Id"],
                    label: json[el]["font_name"],
                    file_name: json[el]["file_name"],
                    sizeCoefficient: json[el]["sizecoefficient"]
                })
            ))

            set_fonts(json1)
        }
    }

    if (JSON.stringify(styles) === '{}' && fonts.length != 0) {
        set_styles({...styles, font_name: fonts[0]["label"], file_name: fonts[0]['file_name'], sizecoefficient: fonts[0]["sizeCoefficient"]})
    }

    return (
        <div className='Style_settings'>
            {
                template_type != "" ?
                    <div className="Input_container">
                        <Select options={fonts} onChange={(event) => set_styles({...styles, font_name: event["label"], file_name: event["file_name"], sizecoefficient: event["sizeCoefficient"]})} placeholder="Оберіть шрифт" value={fonts[fonts.findIndex(el => el["label"] === styles["font_name"])]} />
                    </div> : null
            }
        </div>
    )
}

export default Style_Settings;