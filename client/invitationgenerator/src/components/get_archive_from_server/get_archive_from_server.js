function Get_archive_from_server(props) {

    const path_to_server = props.path_to_server
    const background_image = props.background_image
    const invitation_text = props.invitation_text
    const folder_name = props.folder_name
    const greetings_list = props.greetings_list
    const img_size = props.img_size
    
    let date = new Date()
    let new_folder_name = `${folder_name.replaceAll(" та ", "_та_")}_${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}`

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
                body: JSON.stringify({ background_image: background_image, invitation_text: buf_invitation_text, folder_name: new_folder_name, greetings_list: greetings_list, img_size: img_size })
            })

            if (!archive.ok) throw new Error('Помилка завантаження')

            const blob = await archive.blob()
            const url = window.URL.createObjectURL(blob)

            const a = document.createElement('a')
            a.href = url
            a.download = `${new_folder_name}.zip`
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
        <button onClick={() => Download_archive()}> Завантажити {greetings_list.length} запрошення </button>
    )
}

export default Get_archive_from_server;