const express = require('express')
const router = express.router()

const Posts = require ('./model')

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



module.exports = router