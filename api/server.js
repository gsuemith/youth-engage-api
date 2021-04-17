const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const userRouter = require('./users/router')
const commentRouter = require('./comments/router')
const postRouter = require('./posts/router')
const adultRouter = require('./adults/router')
const authRouter = require('./auth/router.js')

const server = express()

server.use(cors())
server.use(express.json())
server.use(helmet())

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).json({ error: err.message,
    message: "Something unexpected happened with the server"
  })
})

server.use('/api/users', userRouter)
server.use('/api/posts', postRouter)
server.use('/api/comments', commentRouter)
server.use('/api/adults', adultRouter)
server.use('/auth/', authRouter)


server.use("/api", (_, res) => {
  res.json({ data: "API is accounted for" })
})


server.use('/', (req, res) => {
  res.send(`<h2>Welcome to our API!</h2>`);
})

module.exports = server