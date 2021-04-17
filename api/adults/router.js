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

router.get('/:id/children', (req, res, next) => {
  Adults.getChildren(req.params.id)
  .then(children => {
    res.status(200).json(children)
  })
  .catch(next)
})

router.get('/:id/phone', (req, res, next) => {
  Adults.getPhoneNumbers(req.params.id)
  .then(numbers => {
    res.json(200).json(numbers)
  })
  .catch(next)
})

module.exports = router