const net = require('net')

const arrayUsers = []

const handleConnection = (socket) => {
    socket.on('data', (data) => {
        const str = data.toString().split('-')
        const regexPORT = /[0-9]{4}/

        const clientID = parseInt(str[0], 10)
        const addressValid = str[1].match(regexPORT)
        
        const address = addressValid ? parseInt(str[1], 10) : undefined

        if (!arrayUsers.includes(el => el.ID === clientID) && clientID && address){
            const userTmp = {
                ID: clientID,
                address,
                status: 'off',
                pointerConnection: null
            }

            if (arrayUsers.findIndex((el) => el.ID === clientID) === -1){
                arrayUsers.push(userTmp)
            }
            createConnectionClient(arrayUsers)
        } else {
            const message = str[1]
            broadcastMessage(clientID, message)
        }
        
    })

    socket.on('end', () => {
        console.log('encerrou conecction')
    })
}

const server = net.createServer(handleConnection)

server.listen(8080, '127.0.0.1', () => {
    console.log('Servidor on na porta 8080')
})

const createConnectionClient = (users) => {
    for (let index = 0; index < users.length; index++) {
        const element = users[index]
        if (element.status == 'off') {
            const client = new net.Socket()
            const element = users[index]
            arrayUsers[index].pointerConnection = client
            client.connect(element.address, () => {
                client.write('apto para receber resposta')
            })
            arrayUsers.status = 'on'
        }
    }
}

const broadcastMessage = (clientID, message) => {
    const arrayFilter = arrayUsers.filter((el) => el.ID !== clientID)

    for (let index = 0; index < arrayFilter.length; index++) {
        const element = arrayFilter[index]
        element.pointerConnection.write(`${clientID} - ${message}`)
    }
}