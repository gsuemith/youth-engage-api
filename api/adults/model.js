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

const getPhoneNumbers = id => {
  return db('phone_numbers as p')
    .select('ap.description', 'p.number', 'p.can_text')
    .join('adult_phones as ap', 'ap.phone_id', 'p.id')
    .where('ap.adult_id', id)
}

module.exports = {
  find,
  getChildren,
  getPhoneNumbers
}