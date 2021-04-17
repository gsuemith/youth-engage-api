const db = require('../../data/db-config.js')

const find = () => {
  return db('youth')
}

const getPhoneNumbers = id => {
  return db('phone_numbers as p')
    .select('p.number', 'p.can_text')
    .join('youth_phones as yp', 'yp.phone_id', 'p.id')
    .where('yp.youth_id', id)
}

module.exports = {
  find,
  getPhoneNumbers
}