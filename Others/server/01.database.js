const mysql = require("mysql2/promise")
require('dotenv').config()

const initDatabase = async () => mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.ACCESSKEY,
    password: process.env.SECRETKEY,
    database: process.env.DATABASE,
    multipleStatements: true // Enable multiple statements
})

const createTable = async (connection) => {
    console.log("Creating table...");
    const CREATE_SQL = `
        CREATE TABLE IF NOT EXISTS test (
            id INT NOT NULL AUTO_INCREMENT,
            message VARCHAR(45) NULL,
            PRIMARY KEY (id)
        )
    `
    await connection.query(CREATE_SQL)
}

const insertData = async (connection) => {
    console.log("Inserting data...");
    const INSERT_SQL = `
        INSERT INTO test(message) VALUES ('Hello World')
    `
    await connection.query(INSERT_SQL)
}

const insertData2 = async (connection, message) => {
    console.log("Inserting data...");
    // sql预编译，防止sql注入
    const INSERT_SQL = `
        INSERT INTO test(message) VALUES (?)
    `
    // await connection.query(INSERT_SQL, [message])
    await connection.execute(INSERT_SQL, [message])
}

const queryData = async (connection) => {
    console.log("Querying data...");
    const QUERY_SQL = `
        SELECT * FROM test
    `
    const [rows] = await connection.query(QUERY_SQL)
    console.log(rows)
}

const main = async () => {
    const connection = await initDatabase()
    console.log("Database connected");
    // await createTable(connection)
    // await insertData(connection)
    // await insertData2(connection, "Hello World 2")
    await queryData(connection)
    // await connection.end()
}

main()