const mysql = require('mysql2')

const url = process.env.USERS_DB || 'localhost'
const user = process.env.USERS_DB_USERNAME || 'root'
const password = process.env.USERS_DB_PASSWORD || 123

const connection = mysql.createConnection({
  host: url,
  user: user,
  password: password,
  database: 'Collections'
})

const where  = (param, cb) => {
  const q = 'SELECT DISTINCT * FROM `Recipes` WHERE `Collection_id` = ?', [param]
  connection.query(q, (err, res) => {
    cb(err, res)
  })
}

module.exports = { where }
