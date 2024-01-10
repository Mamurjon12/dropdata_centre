const mysql = require('mysql2')
const env = require('./env.config')

const db = mysql.createConnection({
    host: env.DB_HOST,
    port: env.DB_PORT, 
    user: env.DB_USER,
    password: env.DB_PASWORD,
    database: env.DB_DETABASE
}).promise()

module.exports = db 