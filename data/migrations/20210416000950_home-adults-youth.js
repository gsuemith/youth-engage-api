
exports.up = function(knex) {
  return knex.schema
    .createTable('homes', tbl => {
      tbl.increments()
      tbl.string('address').notNullable()
      tbl.string('city', 32).notNullable()
      tbl.string('state', 2).notNullable()
      tbl.integer('zip', 5).notNullable()
    })
    .createTable('adults', tbl => {
      tbl.increments()
      tbl.string('name', 128).notNullable()
      tbl.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      tbl.integer('home_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('homes')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT')
      tbl.boolean('parent').defaultTo(false)
    })
    .createTable('youth', tbl => {
      tbl.increments()
      tbl.string('name', 128).notNullable()
      tbl.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      tbl.integer('home_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('homes')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT')
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('youth')
    .dropTableIfExists('adults')
    .dropTableIfExists('homes')
};
