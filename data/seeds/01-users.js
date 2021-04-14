
exports.seed = function(knex) {
  return knex('users').insert([
    { username: 'garrick', email:'g@rrick.com', password: 'password'},
    { username: 'samuel', email:'s@muel.ai', password: 'password'},
  ])
};
