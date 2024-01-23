const { DataTypes } = require('sequelize')
const sequelize = require('./db')

module.exports = sequelize.define("Student", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: false
    },
    sex: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mobile: {
        type: DataTypes.STRING(11),
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: !false,
    },
})
