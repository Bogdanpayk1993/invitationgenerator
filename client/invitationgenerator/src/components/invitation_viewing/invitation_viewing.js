import './invitation_viewing.css';

function Invitation_Viewing(props) {

    const path_to_server = props.path_to_server
    const background_image = props.background_image

    return (
        background_image != "" ?
            <img src={`${path_to_server}/images/${background_image}`} className='invitation' />
            :
            <p> Оберіть фонове зображення </p>
    )
}

export default Invitation_Viewing;