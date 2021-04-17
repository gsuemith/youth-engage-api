const db = require('../../data/db-config.js')

const find = () => {
  return db('youth')
}

const findById = async id => {
  const youth = await db('youth as y')
    .select('*')
    .join('users as u', 'u.id', 'y.user_id')
    .where('y.id', id)
    .first()

  const numbers = await db('phone_numbers as pn')
    .select('pn.number', 'pn.can_text')
    .join('youth_phones as yp', 'yp.phone_id', 'pn.id')
    .join('youth as y', 'y.id', 'yp.youth_id')
    .where('y.id', youth.id)

  youth.phone_numbers = numbers
  
  return youth
}

const getPhoneNumbers = id => {
  return db('phone_numbers as p')
    .select('p.number', 'p.can_text')
    .join('youth_phones as yp', 'yp.phone_id', 'p.id')
    .where('yp.youth_id', id)
}

const addPhone = async (phone, youth_id) => {
  
  await db.transaction(async trx => {
    // check if phone in database
    let phone_id
    const [existing_phone] = await trx('phone_numbers')
      .where('number', phone.number)

    if (existing_phone) {
      phone_id = existing_phone.id
    } else {
      const [new_phone_id] = await trx('phone_numbers')
        .insert(phone)
      phone_id = new_phone_id
    }

    // create link
    await trx('youth_phones')
      .insert({ phone_id, youth_id })

  })

  return findById(youth_id)
}

module.exports = {
  find,
  findById,
  getPhoneNumbers,
  addPhone
}