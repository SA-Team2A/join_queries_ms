const mysql = require('mysql2')

const url = process.env.COLLECTIONS_DB || 'collections-ms'
const user = process.env.COLLECTIONS_DB_USERNAME || 'root'
const password = process.env.COLLECTIONS_DB_PASSWORD || 'password'

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
