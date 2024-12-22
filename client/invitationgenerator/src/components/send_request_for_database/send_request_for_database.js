async function Send_Request_For_Database(request) {
    let reple
    await fetch(`${request['link']}`,{
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
    })
        .then(res => res.text())
        .then(res => reple = res)

        let json = JSON.parse(reple)

        let json1 = {}
        Object.entries(json).forEach(([key, value]) => {
            json1[key] = value
        })

    return json1
}

export default Send_Request_For_Database;