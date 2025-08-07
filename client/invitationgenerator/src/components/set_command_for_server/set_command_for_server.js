async function Set_command_for_server(request) {
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

export default Set_command_for_server;