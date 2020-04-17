
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resources').del()
    .then(function () {
      // Inserts seed entries
      return knex('resources').insert([
        {
          name: 'Computer',
          description: 'You\'ll need it probably',
          project_id: 1
        }
      ]);
    });
};
