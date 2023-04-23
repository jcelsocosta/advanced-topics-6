const net = require('net')
const readline = require('readline')

const PORT = 8001

const client = new net.Socket()

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdin
})

connection = () => {
    client.connect(8080, '127.0.0.1', () => {
        console.log('conectado na porta 8080')
        rl.addListener('line', line => {
            client.write(line)
        })
    })
}

setTimeout(() => {
    connection()
}, 3000)

const handleConnection = (socket) => {
    socket.on('data', (data) => {
        const str = data.toString()
        console.log(str)
    })
}

const server = new net.createServer(handleConnection)

server.listen(PORT, () => {
    console.log(`Servidor on na porta ${PORT}`)
})