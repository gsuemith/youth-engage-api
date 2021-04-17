const db = require('../../data/db-config.js')

const find = () => {
  return db('adults')
}

module.exports = {
  find
}