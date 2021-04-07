const User = require('./user-model')

const checkUserExists = async (req, res, next) => {
  const id = req.params.id

  try {
    const user = await User.findById(id)
    if (user) {
      req.user = user
      next()
    } else {
      res.status(404).json({ message: "User not found" })
    }
  } catch(e) {
    res.status(500).json(e.message)
  }
}


module.exports = {
  checkUserExists
}