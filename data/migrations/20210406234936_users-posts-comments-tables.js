
exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
      tbl.increments()
      tbl.string('email', 64).unique().notNullable()
      tbl.string('username', 64).notNullable()
      tbl.string('password').notNullable()
    })
    .createTable('posts', tbl => {
      tbl.increments()
      tbl.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('RESTRICT') // 'CASCADE'
        .onUpdate('RESTRICT');
      tbl.string('title', 128).notNullable()
      tbl.string('content', 2048).notNullable()
      tbl.timestamp('created_at').defaultTo(Date())
    })
    .createTable('comments', tbl => {
      tbl.increments()
      tbl.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('RESTRICT') // 'CASCADE'
        .onUpdate('RESTRICT');
      tbl.integer('post_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('posts')
        .onDelete('CASCADE') 
        .onUpdate('CASCADE');
      tbl.string('content', 512).notNullable()
      tbl.timestamp('created_at').defaultTo(Date())
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('comments')
    .dropTableIfExists('posts')
    .dropTableIfExists('users')
};
