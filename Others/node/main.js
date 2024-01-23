const net = require('net')

const server = net.createServer((socket) => {
    console.log('客户端已连接')
    socket.on('data', (data) => {
        console.log('接收到客户端发送的数据：', data.toString())
    })
    socket.on('end', () => {
        console.log('客户端已断开连接')
    })
    socket.write('你好')
})

server.listen(3000, () => {
    console.log('服务器已启动')
})


// const client = net.createConnection({ port: 3000 }, () => {
//     console.log('已连接到服务器')
//     client.write('你好')
// })