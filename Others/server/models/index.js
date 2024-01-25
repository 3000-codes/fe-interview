const sequelize = require('./db')
const Admin = require('./admin.model')
const Book = require('./book.model')
const Student = require('./student.model')
const Clazz = require('./clazz.model')

// 一对多
// 一个班级对应多个学生
Clazz.hasMany(Student)
Student.belongsTo(Clazz)

/**
 * @description:
 * 验证数据库连接
 */
const authenticate = async () => {
    try {
        await sequelize.authenticate()
        console.log("Database connected");
    } catch (error) {
        console.log("Database connection failed");
    }
}

/**
 * @description:
 * 同步所有表
 */
const syncAll = async () => {
    await sequelize.sync({ alter: true })
    console.log("All tables synced");
}

// (function () {
//     authenticate()
//     syncAll()
// })()

module.exports = {
    authenticate,
    syncAll
}