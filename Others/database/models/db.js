const { Sequelize } = require('sequelize');
require('dotenv').config()
/**
 * @description:
 * 创建数据库连接
 */
const sequelize = new Sequelize(process.env.DATABASE, process.env.ACCESSKEY, process.env.SECRETKEY, {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    logging: true,
});

module.exports =
    sequelize
