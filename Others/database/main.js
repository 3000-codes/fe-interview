const Mock = require("mockjs")
const { syncAll } = require('./models')
const addAdmin = require('./services/admin.service')
// require('dotenv').config()

const mockAdmin = () => {
    const data = Mock.mock({
        'admin|10': [{
            loginId: '@string("lower", 5, 10)',
            loginPwd: '@string("lower", 5, 10)',
            name: '@cname',
        }]
    })
    // console.log(data.admin);
    data.admin.forEach(async admin => {
        await addAdmin.addAdmin(admin)
    })
}


const main = async () => {
    // await syncAll()
    // await addAdmin.addAdmin()
    // await addAdmin.deleteAdmin(1)
    mockAdmin()
}

main()