const express = require('express')
const Adults = require('./model')

const router = express.Router()

router.get('/', (req, res, next) => {
  Adults.find()
  .then(adults => {
    res.status(200).json(adults)
  })
  .catch(next)
})

module.exports = router