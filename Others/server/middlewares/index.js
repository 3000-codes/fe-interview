// 处理cookie
const whiteList = ['/test/login']
const handleAuth = (req, res, next) => {

    // let token = req.cookies.token
    // if (!token) token = req.headers.Authorization
    // if (!token || !whiteList.includes(req.path)) {
    //     return res.status(403).send("403")
    // }
    next()
}
const noFilterOrigin = ['http://localhost:5173', "null"]
const handleCors = (req, res, next) => {
    const origin = req.headers.origin
    const method = req.method

    if (method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Methods',
            req.headers['access-control-request-method']
        )
    }

    if (noFilterOrigin.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin)
    }
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
}

module.exports = {
    handleAuth,
    handleCors
}