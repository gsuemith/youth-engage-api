const express = require('express')
const Youth = require('./model')

const router = express.Router()

router.get('/', (req, res, next) => {
  Youth.find()
  .then(youth => {
    res.status(200).json(youth)
  })
  .catch(next)
})


router.get('/:id/phone', (req, res, next) => {
  Youth.getPhoneNumbers(req.params.id)
  .then(numbers => {
    res.json(200).json(numbers)
  })
  .catch(next)
})

module.exports = router