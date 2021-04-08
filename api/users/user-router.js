const express = require('express')
const router = express.Router()

const { checkUserExists } = require('./user-middleware')

const User = require('./user-model')

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



module.exports = router