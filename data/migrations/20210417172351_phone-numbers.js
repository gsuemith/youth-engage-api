
exports.up = function(knex) {
  return knex.schema
    .createTable('phone_numbers', tbl => {
      tbl.increments()
      tbl.string('number',16)
        .unique()
        .notNullable()
      tbl.boolean('can_text').defaultTo(false)
    })
    .createTable('youth_phone_numbers', tbl => {
      tbl.increments()
      tbl.integer('phone_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('phone_numbers')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      tbl.integer('youth_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('youth')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
    .createTable('parent_phone_numbers', tbl => {
      tbl.increments()
      tbl.string('description')
      tbl.integer('phone_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('phone_numbers')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      tbl.integer('youth_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('adults')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('parent_phone_numbers')
    .dropTableIfExists('youth_phone_numbers')
    .dropTableIfExists('phone_numbers')
};
