const MongoClient = require('mongodb').MongoClient

const url = process.env.COMMENTS_DB || 'comments'
const port = process.env.COMMENTS_DB_PORT || 27019
const uri = `mongodb://${url}:${port}`

var comments_db = null

MongoClient.connect(uri, (err, client) => {
  comments_db = client.db('comments').collection('comments')
})

const find = (params, cb) => {
  comments_db.find(params).toArray((err, docs) => {
    cb(err, docs)
  })
}

module.exports = { find }
