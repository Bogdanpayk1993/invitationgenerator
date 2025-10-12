import Select from 'react-select';
import './style_settings.css';

function Style_Settings(props) {

    const template_type = props.template_type

    return (
        <div className='Style_settings'>
            {
                template_type != "" ?
                    null
                    :
                    null
            }
        </div>
    )
}

export default Style_Settings;