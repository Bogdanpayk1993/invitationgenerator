async function Get_file_from_server(request) {
    let reple
    await fetch(`${request['link']}`, {
        method: "POST",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(request)
    })
        .then(res => res.text())
        .then(res => reple = res)

    return reple
}

export default Get_file_from_server;