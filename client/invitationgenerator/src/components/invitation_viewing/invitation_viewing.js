import './invitation_viewing.css';

function Invitation_Viewing(props) {
    
    const background_image = props.background_image

    return (
        background_image != "" ?
            <img src={background_image} className='invitation' />
            :
            <p> Оберіть фонове зображення </p>
    )
}

export default Invitation_Viewing;