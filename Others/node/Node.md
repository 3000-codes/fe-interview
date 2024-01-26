## node调试

```bash
node  --inspect  xxx.js
# 将会开启一个调试服务器，可以通过chrome://inspect/#devices来访问
```

## fs模块

### 写入流

```js
// 基本使用

const fs = require('fs')

const ws = fs.createWriteStream('./test.txt', {
    flags: 'w', // 默认值 'w'
    encoding: 'utf8', // 默认值 'utf8'
    fd: null, // 默认值 null
    mode: 0o666, // 默认值 0o666
    autoClose: true, // 默认值 true
    start: 0, // 写入文件的起始位置
    highWaterMark: 3 // 默认值 16k
})

// 写入内容
const flag = ws.write('hello') // 返回一个布尔值，表示是否可以继续写入

ws.on('open', () => {
    console.log('当文件打开时触发')
})

ws.on('close', () => {
    console.log('当文件关闭时触发')

})

ws.on('drain', () => {
    console.log('当文件可以继续写入时触发')
})

/**
 * 背压：当写入速度大于读取速度时，会导致数据丢失，这种现象称为背压
 * 解决方案：当写入速度大于读取速度时，暂停写入，等待读取完成后再继续写入（通过监听drain事件来实现）
 */
```

### 复制文件

```js
const fs = require('fs')

// 方案一：通过readFile和writeFile来实现
function copyV1(path) {
    fs.readFile(path, (err, data) => {
        if (err)
            return console.log(err)
        fs.writeFile('./test.txt', data, (err2) => {
            if (err2)
                return console.log(err2)
            console.log('复制成功')

        })
    })
}

// 方案二：通过createReadStream和createWriteStream来实现
function copyV2(path) {
    const rs = fs.createReadStream(path)
    const ws = fs.createWriteStream('./test.txt')
    rs.on('data', (chunk) => {
        const flag = ws.write(chunk)
        if (!flag) {
            rs.pause()
        }
    })
    ws.on('drain', () => {
        rs.resume()
    })
}

// 方案三：通过pipe来实现
function copyV3(path) {
    const rs = fs.createReadStream(path)
    const ws = fs.createWriteStream('./test.txt')
    rs.pipe(ws)
}
```

## net模块

通信模块，用于创建TCP/IP服务器或客户端，或者通过IPC进行进程间通信

### 创建TCP服务器

```js
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
```

### 创建TCP客户端

```js
const net = require('net')

const client = net.createConnection({
    host: '', // 默认值 localhost
    port: 3000， // 默认值 80
}, () => {
    console.log('已连接到服务器')
    client.write('你好') // 发送数据, 可以是字符串或者Buffer对象
    // 如果发送的数据不符合http协议，那么服务器可能无法返回预期的结果

    client.write('GET / HTTP/1.1\r\nHost: www.baidu.com\r\n\r\nConection:kkep-alive\r\n\r\n')
    // 向 ‘/’ 发送一个http请求

})

client.on('data', (data) => {
    // data是一个Buffer对象，需要转换为字符串
    console.log('接收到服务器发送的数据：', data.toString("utf8"))
})

client.on('end', () => {
    console.log('已断开与服务器的连接')
})
```

## http模块

### 创建http服务器

```js
const http = require('http')

const server = http.createServer((req, res) => {
    // req是一个可读流，res是一个可写流
    console.log('客户端请求了：', req.url)
    res.write('hello')
    res.end()
})

server.listen(3000, () => {
    console.log('服务器已启动')
})
```

### 创建http客户端

```js
const http = require('http')

const client = http.request({
    host: 'www.baidu.com',
    port: 80,
    path: '/',
    method: 'GET'
}, (res) => {
    // res是一个可读流
    console.log('接收到服务器的响应')
    console.log('状态码：', res.statusCode)
    console.log('响应头：', res.headers)
    res.on('data', (data) => {
        console.log('接收到服务器发送的数据：', data.toString())
    })
    res.on('end', () => {
        console.log('响应数据已全部接收完毕')
    })
})

// client.write('hello') // 发送请求体

client.end()
```

## https模块

准备工作：创建私钥和证书（自签名）

```bash
# 生成私钥
openssl genrsa 1024 > server.key

# 生成证书签名请求
openssl req -new -key server.key -out server.csr

# 生成证书(x509是证书的格式)
openssl x509 -req -in server.csr -signkey server.key -out server.cert
```

### 创建https服务器

```js
const https = require('https')
const fs = require('fs')

const options = {
    key: fs.readFileSync('./server.key'), // 私钥
    cert: fs.readFileSync('./server.cert') // 证书
}

const server = https.createServer(options, (req, res) => {
    console.log('客户端请求了：', req.url)
    res.write('hello')
    res.end()
})

server.listen(3000, () => {
    console.log('服务器已启动')
})
```

### 创建https客户端

```js
const https = require('https')
const fs = require('fs')

const options = {
    hostname: 'www.baidu.com',
    port: 443, // 默认值 443
    path: '/',
    method: 'GET',
    key: fs.readFileSync('./client.key'), // 私钥
    cert: fs.readFileSync('./client.cert') // 证书
}

const client = https.request(options, (res) => {
    console.log('接收到服务器的响应')
    console.log('状态码：', res.statusCode)
    console.log('响应头：', res.headers)
    res.on('data', (data) => {
        console.log('接收到服务器发送的数据：', data.toString())
    })
    res.on('end', () => {
        console.log('响应数据已全部接收完毕')
    })
})

client.end()
```
