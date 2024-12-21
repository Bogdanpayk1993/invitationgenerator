async function Send_Request_For_Database(request) {
    let reple
    await fetch(`http://localhost:8000/${request['link']}`,{
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
    })
        .then(res => res.text())
        .then(res => reple = res)
    return reple
}

export default Send_Request_For_Database;