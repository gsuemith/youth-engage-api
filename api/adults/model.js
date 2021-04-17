const db = require('../../data/db-config.js')

const find = () => {
  return db('adults')
}

const getChildren = parent_id => {
  return db('adults as a')
    .select('y.*')
    .join('homes as h', 'h.id', 'a.home_id')
    .join('youth as y', 'h.id', 'y.home_id')
    .where('a.id', parent_id)
}

module.exports = {
  find,
  getChildren,
}