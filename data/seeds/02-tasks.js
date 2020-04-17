
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {
          description: 'Fork',
          notes: 'Fork the project',
          completed: true,
          project_id: 1
        },
        {
          description: 'Clone',
          notes: 'Clone the project',
          completed: true,
          project_id: 1
        },
        {
          description: 'Initialize',
          notes: 'Initialize NPM in the project',
          completed: false,
          project_id: 1
        }
      ]);
    });
};
