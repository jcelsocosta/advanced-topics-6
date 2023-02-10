const net = require('net')
const readline = require('readline')

const handleConnection = socket => {
    socket.on('end', () => {
        console.log('desconectou')
    })

    socket.on('data', (data) => {
        const str = data.toString()

        if (str === 'end') {
            socket.end()
        }
        console.log(str)
    })
}

const server = new net.createServer(handleConnection)

server.listen(3000, '127.0.0.1', () => {
    console.log('server ligado PORT: 3000')

    setTimeout(() => {
        connection()
    }, 3000);
})

const client = new net.Socket()

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdin
})

connection = () => {
    client.connect(4000, '127.0.0.1', () => {
        console.log('connectou')
        rl.addListener('line', line => {
            client.write(line)
        })
    })
}