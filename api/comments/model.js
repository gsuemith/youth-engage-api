const db = require('../../data/db-config.js')

const find = () => {
  return db('comments')
}

const findById = id => {
  return db('comments').where({ id }).first()
}



module.exports = {
  find,
  findById,
}