const express = require('express')
const router = express.router()

const Comments = require('./model')

router.get('/', (req, res) => {
  Comments.find()
  .then(comments => {
    if(comments.length > 0){
      res.status(200).json(comments)
    }
  })
  .catch(err => {
    res.status(500).json({ message:err.message })
  })
})

module.exports = router