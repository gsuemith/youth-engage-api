const express = require('express')
const router = express.Router()

const Posts = require('./model')
const { postExists } = require('./middleware')

router.use('/:id', postExists)

router.get('/', async (req, res) => {
  try {
    const posts = await Posts.find()
    if (posts.length > 0){
      res.status(200).json(posts)
    } else {
      res.status(404).json({
        message: "Sorry, no posts found."
      })
    }
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/:id', (req, res) => {
  res.status(200).json(req.post)
})

module.exports = router