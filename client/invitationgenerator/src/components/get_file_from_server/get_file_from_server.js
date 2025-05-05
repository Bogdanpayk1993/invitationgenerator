async function Get_file_from_server(request) {
    await fetch(`${request['link']}`,{
        method: "POST",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(request) 
    })

    .then(res => res.blob())
    .then(res => {
        let url = URL.createObjectURL(res)

        let anchor = document.createElement('a')
        anchor.href = url
        anchor.download = 'res.jpg'
        document.body.append(anchor)
        anchor.style = "display: none"
        anchor.click()
        anchor.remove()

        URL.revokeObjectURL(url)
    })

}

export default Get_file_from_server;