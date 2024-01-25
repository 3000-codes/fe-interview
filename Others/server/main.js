const http = require('http')
const path = require("path")
const express = require('express')

const { syncAll } = require('./models')
const app = express()
const port = 3000
const clientPath = path.resolve(__dirname, "..", "client", "dist")
// console.log(clientPath);
// app.use(express.static(clientPath)) // 静态服务器
app.use("page", express.static(clientPath)) // xxx/page/xxx.html
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

// 通用中间件
app.use((req, res, next) => {
    console.log('Time:', Date.now())
    next()
})

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

// 404处理中间件
app.use((req, res, next) => {
    res.status(404).send('Sorry cant find that!')
})

// 单一路由处理中间件
app.use('/test/single', (req, res, next) => {
    console.log('Request Type:', req.method)
    next()
})


const router = express.Router() // 创建路由器
router.get('/', (req, res) => {
    res.send('Birds home page')
})
router.get('/about', (req, res) => {
    res.send('About birds')
})
app.use('/birds', router) // 将路由器挂载到应用程序的路径上


const server = http.createServer(app)
syncAll()




server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

