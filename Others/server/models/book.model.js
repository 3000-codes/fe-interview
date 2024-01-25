const { DataTypes } = require('sequelize')
const sequelize = require('./db')

module.exports = sequelize.define("Book", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    publishDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    imgUrl: {
        type: DataTypes.STRING,
        allowNull: !false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    createdAt: false, // 默认true自动添加列
    updatedAt: false, // 默认true自动添加列
})
