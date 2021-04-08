const express = require('express')
const router = express.Router()

const Comments = require('./model')

router.get('/', (req, res) => {
  Comments.find()
  .then(comments => {
    if(comments.length > 0){
      res.status(200).json(comments)
    } else {
      res.status(404).json({
        message: "Sorry, no comments found."
      })
    }
  })
  .catch(err => {
    res.status(500).json({ message:err.message })
  })
})

module.exports = router