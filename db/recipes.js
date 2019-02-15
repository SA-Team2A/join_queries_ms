const MongoClient = require('mongodb').MongoClient

const url = process.env.COMMENTS_DB || 'comments'
const port = process.env.COMMENTS_DB_PORT || 27019
const uri = `mongodb://${url}:${port}`

var recipes_db = null

MongoClient.connect(uri, (err, client) => {
  recipes_db = client.db('recipes_ms').collection('recipes')
})

const find_in = (params, cb) => {
  const filter = { _id: { $in: params } }
  recipes_db.find(filter).toArray((err, docs) => {
    cb(err, docs)
  })
}

module.exports = { find_in }
