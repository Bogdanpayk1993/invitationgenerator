import { useState, useRef, useEffect } from 'react';
import Edit_Template from '../edit_template/edit_template';
import './invitation_viewing.css';

function Invitation_Viewing(props) {

    const path_to_server = props.path_to_server
    const background_image = props.background_image
    const invitation_text = props.invitation_text
    const set_invitation_text = props.set_invitation_text
    const styles = props.styles
    const set_client_height = props.set_client_height
    const set_client_font_size = props.set_client_font_size

    const img_Ref = useRef()
    const [img_size, set_img_size] = useState({})

    function handleLoad() {
        if (img_Ref.current) {
            const { width, height } = img_Ref.current
            set_img_size({ width: width, height: height })
        }
    }

    useEffect(() => {
        const handleResize = () => {
            if (img_Ref.current) {
                const { width, height } = img_Ref.current
                set_img_size({ width: width, height: height })
            }
        }

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => { 
        set_client_height(img_size.height)
    }, [img_size])

    return (
        background_image != "" ?
            <div className='invitation_viewing_container'>
                <div className='invitation_viewing'>
                    <img ref={img_Ref} src={`${path_to_server}/images/backgrounds/${background_image}`} className='invitation' onLoad={() => handleLoad()} />
                </div>
                <Edit_Template invitation_text={invitation_text} set_invitation_text={set_invitation_text} img_size={img_size} styles={styles} set_client_font_size={set_client_font_size} />
            </div>
            :
            <div className='invitation_message_container'>
                <p> Оберіть фонове зображення </p>
            </div>
    )
}

export default Invitation_Viewing;