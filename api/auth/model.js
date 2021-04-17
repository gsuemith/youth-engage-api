const db = require('../../data/db-config.js')

const add = async newUser => {
  const { home, name, user } = newUser
  const group = user.role === 'youth' ? 'youth' : 'adults'
  
  let user_id
  await db.transactions(async trx => {
    let home_id
    const [existing_home] = await trx('homes').where('address', home.address);
    if (existing_home) {
      home_id = existing_home.id
    } else {
      const [new_home_id] = await trx('homes').insert(home)
      home_id = new_home_id
    }

    const [new_user_id] = await trx('users').insert(user)

    const [group_id] = await trx(group)
      .insert({ name, new_user_id, home_id, parent: user.role === 'parent' })

    if (group_id)
      user_id = new_user_id
  })

  return db('users').where({ id: user_id }).first()
}

module.exports = {
  add
}