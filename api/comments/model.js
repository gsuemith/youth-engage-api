const db = require('../../data/db-config.js')

const find = () => {
  return db('comments as c')
    .select('c.id', 'username', 'title as reply_to', 'c.content as comment', 'c.created_at')
    .join('users as u', 'u.id', 'c.user_id')
    .join('posts as p', 'p.id', 'c.post_id')
}

const findById = id => {
  return db('comments as c')
  .select('c.id', 'username', 'title as reply_to', 'c.content as comment', 'c.created_at')
  .join('users as u', 'u.id', 'c.user_id')
  .join('posts as p', 'p.id', 'c.post_id')
  .where('c.id', id)
  .first()
}



module.exports = {
  find,
  findById,
}