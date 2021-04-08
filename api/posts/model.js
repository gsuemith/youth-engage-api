const db = require('../../data/db-config.js')

const find = () => {
  return db('posts')
}

const findById = id => {
  return db('posts').where({ id }).first()
}



module.exports = {
  find,
  findById,
}