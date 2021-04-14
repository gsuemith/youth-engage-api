
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('posts').insert([
    { user_id: 1, title: 'Genesis 1:1', content: 'In the beginning, when God created the Heavens and the Earth' },
    { user_id: 1, title: 'John 1:1', content: 'In the beginning was the word and the word was with God' },
  ])
};
