const express = require('express')
const helmet = require('helmet')

const userRouter = require('./users/user-router')

const server = express()

server.use(express.json())
server.use(helmet())

server.use('/api/users', userRouter)

module.exports = server