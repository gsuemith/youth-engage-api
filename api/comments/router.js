const express = require('express')
const { checkCommentExists } = require('./middleware')
const router = express.Router()

const Comments = require('./model')

router.use('/:id', checkCommentExists)

router.get('/', (req, res, next) => {
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
  .catch(err => { next(err)})
})

router.get('/:id', (req, res) => {
  res.status(200).json(req.comment)
})

module.exports = router