const join = require('./db/join')
const express = require('express')
const users = require('./db/users')
const recipes = require('./db/recipes')
const comments = require('./db/comments')
const collections = require('./db/collections')
const app = express()
const port = process.env.PORT || 3000


// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST')
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-type')
  res.header('Access-Control-Allow-Credentials', true)
  if ('OPTIONS' == req.method) {
    res.sendStatus(200)
  } else {
    next()
  }
})

app.get('/users_comments', (req, res, next) => {
  const recipe_id = req.query.recipe_id
  comments.find({ recipe_id }, (err, result) => {
    if (err) {
      console.log(err)
      return res.status(500).send({
        code: 500,
        message: 'INTERNAL ERROR'
      })
    }
    if (result.length === 0) {
      console.log(`No comments to recipe with id = ${recipe_id}`)
      res.status(200).json([])
    } else {
      users.where_in(result.map( r => r.user_id ), (err2, result2) => {
        if (err2) {
          console.log(err2)
          return res.status(500).send({
            code: 500,
            message: 'INTERNAL ERROR'
          })
        }
        res.status(200).send(join(result, 'user_id', result2, 'id'))
      })
    }
  })
})

app.get('/recipes_collections', (req, res, next) => {
  const collection_id = parseInt(req.query.collection_id)
  collections.where(collection_id, (err, result) => {
    if (err) {
      console.log(err)
      return res.status(500).send({
        code: 500,
        message: 'INTERNAL ERROR'
      })
    }
    if (result.length === 0) {
      console.log(`No Recipes for collection with id = ${collection_id}`)
      res.status(200).json([])
    } else {
      recipes.find_in(result.map( r => r.Recipe_id ), (err2, result2) => {
        if (err2) {
          console.log(err2)
          return res.status(500).send({
            code: 500,
            message: 'INTERNAL ERROR'
          })
        }
        res.status(200).send(join(result, 'Recipe_id', result2, '_id'))
      })
    }
  })
})

// URL Not found
app.use((req, res, next) => {
  res.status(404).json({
    code: 404,
    message: 'NOT FOUND'
  })
})

app.listen(port, () => {
  console.log(`Join microservice running on port ${port}`)
})
