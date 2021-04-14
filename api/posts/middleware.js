const Posts = require('./model')

const postExists = async (req, res, next) => {
  const id = req.params.id
  try {
    const post = await Posts.findById(id)
    if (post) {
      req.post = post
      next()
    } else {
      res.status(404).json({ message: 'Post not found'})
    }
  } catch (err) { next(err) }
}

module.exports = {
  postExists
}