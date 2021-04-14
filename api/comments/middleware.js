const Comments = require('./model')

const checkCommentExists = async (req, res, next) => {
  const id = req.params.id

  try {
    const comment = await Comments.findById(id)
    if (comment) {
      req.comment = comment
      next()
    } else {
      res.status(404).json({ message: "Comment not found" })
    }
  } catch(e) {
    next(e)
  }
}


module.exports = {
  checkCommentExists
}