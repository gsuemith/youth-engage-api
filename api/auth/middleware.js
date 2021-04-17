const db = require('../../data/db-config')
const bcrypt = require('bcryptjs')

const validateNewUser = async (req, res, next) => {
  const { email, username, password, role, 
    name, address, city, state, zip } = req.body

  if (!email || !username || !password || 
    !role || !name || !address ){
    res.status(400).json({ 
      message: "Required information missing" 
    })
    return
  }

  const user = await db('users').where({ email }).first()

  if (user) {
    res.status(400).json({ 
      message: "sorry, that email is already taken"
    })
    return
  }

  // hash password
  const hash = bcrypt.hashSync(password, 10)

  req.newUser = {
    user: { 
      email: email.toLowerCase(),
      password: hash, 
      username, role 
    },
    home: { address, city, state, zip },
    name
  }

  next()
}

const checkUserExists = async (req, res, next) => {
  const user = await db('users')
    .where('email', req.body.email)
    .first()
  
  if (user) {
    req.user = user;
    next()
  } else {
    res.status(404).json({ message: 'Please check email is correct' })
  }
}

module.exports = {
  validateNewUser,
  checkUserExists,
}