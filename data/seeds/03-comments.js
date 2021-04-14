
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('comments').insert([
    { user_id: 2, post_id: 1, content: 'Wow, so inspiring!'},
    { user_id: 2, post_id: 2, content: "I've never thought about it like that."},
  ])
};
