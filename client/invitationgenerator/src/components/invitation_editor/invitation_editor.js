import Background_Settings from '../background_settings/background_settings';
import './invitation_editor.css';

function Ivitation_editor() {
    return (
        <>
            <div className='header'>
                <h1> Сервіс масової розсилки запрошень "Приходь" </h1>
            </div>
            <div className="column" id='text_settings'>
                
            </div>
            <div className="column" id='invitation_appearance'>
                
            </div>
            <div className="column" id='image_settings'>
                <Background_Settings type="wedding" />
            </div>
        </>
    )
}

export default Ivitation_editor;