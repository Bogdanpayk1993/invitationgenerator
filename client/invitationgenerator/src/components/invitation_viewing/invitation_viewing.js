import Edit_Template from '../edit_template/edit_template';
import './invitation_viewing.css';

function Invitation_Viewing(props) {

    const path_to_server = props.path_to_server
    const background_image = props.background_image
    const template_type = props.template_type
    const invitation_text = props.invitation_text
    const set_invitation_text = props.set_invitation_text

    return (
        background_image != "" ?
            <div className='invitation_viewing_container'>
                <div className='invitation_viewing'>
                    <img src={`${path_to_server}/images/backgrounds/${background_image}`} className='invitation' />
                </div>
                <Edit_Template template_type={template_type} invitation_text={invitation_text} set_invitation_text={set_invitation_text} />
            </div>
            :
            <div className='invitation_message_container'>
                <p> Оберіть фонове зображення </p>
            </div>
    )
}

export default Invitation_Viewing;