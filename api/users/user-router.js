const express = require('express')
const router = express.Router()

const { checkUserExists } = require('./user-middleware')

const User = require('./user-model')

router.use('/:id', checkUserExists)





module.exports = router