const { DataTypes } = require('sequelize')
const sequelize = require('./db')

module.exports = sequelize.define("Class", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    openDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    createdAt: false, // 默认true自动添加列
    updatedAt: false, // 默认true自动添加列
})