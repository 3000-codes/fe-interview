const express = require('express')
const http = require('http')
const { syncAll } = require('./models')
const app = express()
const port = 3000

app.get('/test/redirct', (req, res) => {
    // res.send('Hello World!') //发送字符串
    res.status(302).header('Location', 'http://www.baidu.com').end()//重定向
})

app.post('/test/post', (req, res) => {
    res.send('Got a POST request')
})

app.put('/test/middlewares', (req, res, next) => {
    console.log('Request Type:', req.method)
    next()
}, (req, res, next) => {
    if (Math.random() > 0.5) {
        next()
    } else {
        next(new Error('error'))
    }
}, (req, res) => {
    // 如果前面的中间件没有出错，则执行这个中间件
    res.send('Hello World!')
}, (err, req, res, next) => {
    // 如果前面的中间件出错，则执行这个中间件
    console.error(err.stack)
    res.status(500).send('Something broke!')
})


const server = http.createServer(app)
syncAll()



server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

