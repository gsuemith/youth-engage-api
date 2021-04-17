const db = require('../../data/db-config.js')

const add = async newUser => {
  const { home, name, user } = newUser
  const group = user.role === 'youth' ? 'youth' : 'adults'
  
  let new_user_id
  await db.transaction(async trx => {

    // check if address in database
    let home_id
    const [existing_home] = await trx('homes').where('address', home.address);
    if (existing_home) {
      home_id = existing_home.id
    } else {
      const [new_home_id] = await trx('homes').insert(home)
      home_id = new_home_id
    }

    // create user account
    const [user_id] = await trx('users').insert(user)

    // create new Member
    const newMember = { name, user_id, home_id }

    if(group === 'adults')
      newMember.parent = user.role === 'parent'

    const [group_id] = await trx(group).insert(newMember)

    if (group_id)
      new_user_id = user_id
  })

  return db('users').where({ id: new_user_id }).first()
}

module.exports = {
  add
}