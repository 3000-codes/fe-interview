const http = require('http')
const path = require("path")
const express = require('express')
const cookieParser = require('cookie-parser')

const { syncAll } = require('./models')
const { handleCors, handleAuth } = require('./middlewares')
const app = express()
const port = 3000
const clientPath = path.resolve(__dirname, "..", "client", "dist")
// console.log(clientPath);
// app.use(express.static(clientPath)) // 静态服务器
app.use("page", express.static(clientPath)) // xxx/page/xxx.html

app.use(cookieParser("secretkey")) // 解析cookie

app.get('/test/redirct', (req, res) => {
    // res.send('Hello World!') //发送字符串
    res.status(302).header('Location', 'http://www.baidu.com').end()//重定向
})

app.post('/test/post', (req, res) => {
    res.send('Got a POST request')
})


app.use(handleAuth)

app.post('/test/login', (req, res) => {
    // res.setHeader('Set-Cookie', 'username=tom;max-age=900000')
    res.cookie('username', 'tom', { maxAge: 900000 })
    res.header("Authorization", "Bearer " + "token")
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


app.get('/test/jsonp', (req, res) => {
    // 将请求参数中的callback取出来，然后将响应数据包裹在callback中返回
    // jsonp的原理是利用script标签的src属性不受同源策略限制的特点
    // 只支持get请求，而且会打断服务器的消息格式（只能返回纯文本）
    const data = JSON.stringify({ name: "tom", age: 20 })
    const { callback } = req.query
    res
        .header("Content-Type", "application/javascript")
        .send(`${callback}(${data})`)

    // client端
    // <script>
    //     function handleData(data){
    //         console.log(data)
    //     }
    // </script>
    // <script src="http://localhost:3000/test/jsonp?callback=handleData"></script>
})

app.use(handleCors)
app.get('/test/cors', (req, res) => {
    // 跨域资源共享
    // 1. 服务器设置响应头
    // 2. 客户端设置请求头
    res.header("Access-Control-Allow-Origin", "http://localhost:8080")
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
    res.header("Access-Control-Allow-Headers", "X-Token,Content-Type")
    res.send('cors')
})
app.get('/test/cors2', (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173")
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
    res.header("Access-Control-Allow-Headers", "X-Token,Content-Type")
    res.send('cors2')
})
app.post('/test/cors3', (req, res) => {
    // res.header("Access-Control-Allow-Origin", "*")
    // res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
    // res.header("Access-Control-Allow-Headers", "X-Token,Content-Type")
    res.send('cors3')
})

const server = http.createServer(app)
syncAll()




server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

