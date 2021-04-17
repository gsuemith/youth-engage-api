const express = require('express')
const User = require('./model')
const { checkUserExists } = require('./middleware')

const router = express.Router()

router.use('/:id', checkUserExists)

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find()
    if(users.length > 0){
      res.status(200).json(users)
    } else {
      res.status(404).json({
        message: "Sorry, no users found."
      })
    }
  } catch (err) { next(err) }
})

router.get('/:id', (req, res) => {
  res.status(200).json(req.user)
})

router.get('/:id/posts', async (req, res, next) => {
  try {
    const posts = await User.getPosts(req.user.id)
    res.status(200).json(posts)
  } catch (err) { next(err) }
})



module.exports = router