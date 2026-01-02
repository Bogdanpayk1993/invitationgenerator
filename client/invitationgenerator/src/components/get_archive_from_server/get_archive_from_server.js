function Get_archive_from_server(props) {

    const path_to_server = props.path_to_server
    const background_image = props.background_image
    const invitation_text = props.invitation_text
    const greetings_list = props.greetings_list
    const permission_generating_invitations = props.permission_generating_invitations
    const styles = props.styles
    const client_height = props.client_height
    const client_font_size = props.client_font_size

    async function Download_archive() {

        let buf_invitation_text = []

        invitation_text.forEach((el_i, i) => (
            buf_invitation_text[i] = "",
            el_i['text'].forEach((el_j) => (
                buf_invitation_text[i] += el_j[0]['body']
            )),
            buf_invitation_text[i] = { text: buf_invitation_text[i], offset: el_i['offset'] }
        ))

        try {
            let archive = await fetch(`${path_to_server}/invitations/getInvitations`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ background_image: background_image, invitation_text: buf_invitation_text, greetings_list: greetings_list, styles: styles, client_height: client_height, client_font_size: client_font_size })
            })

            if (!archive.ok) throw new Error('Помилка завантаження')

            const blob = await archive.blob()
            const url = window.URL.createObjectURL(blob)

            const a = document.createElement('a')
            a.href = url
            a.download = 'invitations.zip'
            document.body.appendChild(a)
            a.click()
            a.remove()

            window.URL.revokeObjectURL(url)
        } catch (error) {
            console.error('Помилка завантаження:', error)
            alert('Не вдалося завантажити файл')
        }
    }

    return (
        invitation_text.length != 0 && greetings_list.length != 0 && permission_generating_invitations != false ?
            <div className="Button_container">
                <button onClick={() => Download_archive()}> Завантажити {greetings_list.length} запрошення </button>
            </div>
            :
            null
    )
}

export default Get_archive_from_server;