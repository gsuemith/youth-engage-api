const db = require('../../data/db-config.js')

const find = () => {
  return db('posts as p')
    .select('p.id', 'username as author', 'title', 'content', 'created_at')
    .join('users as u', 'u.id', 'p.user_id')
}

const findById = id => {
  return db('posts as p')
  .select('p.id', 'username as author', 'title', 'content', 'created_at')
  .join('users as u', 'u.id', 'p.user_id')
  .where('p.id', id)
  .first()
}



module.exports = {
  find,
  findById,
}