const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const JWT_SECRET = "a fake secret for now"

const Auth = require('./model')
const { validateNewUser, checkUserExists } = require('./middleware')

const router = express.Router()

router.post('/register', validateNewUser, (req, res, next) => {
  Auth.add(req.newUser)
  .then(user => {
    res.status(201).json(user);
  })
  .catch(next)
})

router.post('/login', checkUserExists, (req, res) => {
  const user = req.user;

  if (bcrypt.compareSync(req.body.password, user.password)) {
    const token = makeToken(user)
    res.status(200).json({
      message: `Welcome ${user.username}!`,
      token
    })
  } else {
    res.status(401).json({ message: "Credentials invalid!" })
  }
})

function makeToken (user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role
  }
  const options = {
    expiresIn: '10 seconds'
  }
  return jwt.sign(payload, JWT_SECRET, options)
}

module.exports = router