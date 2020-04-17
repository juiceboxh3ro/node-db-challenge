
exports.up = function(knex) {
  return knex.schema
    .createTable('projects', tbl => {
      tbl.increments();
      tbl.string('name', 128)
        .unique()
        .notNullable();
      tbl.string('description', 255)
        .nullable();
      tbl.boolean('completed')
        .notNullable()
        .defaultTo(0);
    })
    // tasks
    .createTable('tasks', tbl => {
      tbl.increments();
      tbl.string('description', 255)
        .notNullable();
      tbl.string('notes', 255)
        .nullable();
      tbl.boolean('completed')
        .notNullable()
        .defaultTo(0);
      tbl.integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
    // resources
    .createTable('resources', tbl => {
      tbl.increments();
      tbl.string('name', 255)
        .notNullable();
      tbl.string('description', 255)
        .nullable()
    })
    .createTable('project_resources', tbl => {
      tbl.increments();
      tbl.integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      tbl.integer('resource_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('resources')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      
      tbl.unique(['project_id', 'resource_id'])
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('projects')
    .dropTableIfExists('project_resources')
};
