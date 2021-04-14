const express = require('express')
const router = express.Router()

const { checkUserExists } = require('./middleware')

const User = require('./model')

router.use('/:id', checkUserExists)

router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    if(users.length > 0){
      res.status(200).json(users)
    } else {
      res.status(404).json({
        message: "Sorry, no users found."
      })
    }
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/:id', (req, res) => {
  res.status(200).json(req.user)
})

router.get('/:id/posts', async (req, res, next) => {
  try {
    const posts = await User.getPosts(req.user.id)
    return posts
  } catch (err) { next(err) }
})



module.exports = router