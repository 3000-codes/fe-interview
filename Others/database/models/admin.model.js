
const { DataTypes } = require('sequelize')
const sequelize = require('./db')
const Admin = sequelize.define("Admin", {
    loginId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    loginPwd: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // role: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    // },
}, {
    // freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步
    // tableName: 'admin', //定义表名
    createdAt: false, // 默认true自动添加列
    updatedAt: false, // 默认true自动添加列
    paranoid: false, // 不会删除数据库条目，但将新添加的属性deletedAt设置为当前日期
})



const syncAdmin = async () => {
    // 同步表
    // Admin.sync() // 创建表
    await Admin.sync({ alter: true }) // 修改表
    // Admin.sync({ force: true }) // 删除表
    console.log("Admin synced");
}


module.exports = {
    Admin,
    syncAdmin
}
