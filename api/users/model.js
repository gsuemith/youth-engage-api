const db = require('../../data/db-config.js')

const find = () => {
  return db('users')
}

const findById = id => {
  return db('users').where({ id }).first()
}

const getPosts = user_id => {
  return db('posts as p')
    .select('p.id', 'u.username as author', 'title', 'content', 'created_at')
    .join('users as u', 'u.id', 'p.user_id')
    .where({ user_id })
}

module.exports = {
  find,
  findById,
  getPosts,
}