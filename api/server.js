const express = require('express')
const helmet = require('helmet')

const userRouter = require('./users/user-router')
const commentRouter = require('./comments/router')
const postRouter = require('./posts/router')

const server = express()

server.use(express.json())
server.use(helmet())

server.use('/api/users', userRouter)
server.use('/api/posts', postRouter)
server.use('/api/comments', commentRouter)


server.use('/', (req, res) => {
  res.send(`<h2>Welcome to our API!</h2>`);
})

module.exports = server