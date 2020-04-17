
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {
          name: 'Sprint',
          description: 'Do this week\'s sprint challenge',
          completed: false
        }
      ]);
    });
};
