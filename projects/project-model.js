const db = require('../data/db-config')

module.exports = {
  getProjects, findProject, newProject,
  getResources, findResource, newResource,
  getTasks, newTask
}

function getProjects() {
  return db('projects')
}

function findProject(id) {
  return db('projects').where({ id }).first()
}

function newProject(project) {
  return db('projects')
    .insert(project, 'id')
    .then(([id]) => {
      return findProject(id)
    }
  )
}

function getResources() {
  return db('resources')
}

function findResource(id) {
  return db('resources').where({ id }).first()
}

function newResource(resource) {
  return db('resources')
    .insert(resource, 'id')
    .then(([id]) => {
      return findResource(id)
    }
  )
}

function getTasks(id) {
/*
  SELECT p.name, p.description, t.description, t.notes, t.completed
  FROM projects AS p
  JOIN tasks AS t
  WHERE t.project_id = p.id
*/

return db('projects AS p')
.join('tasks AS t', 't.project_id', 'p.id')
.select('p.name', 'p.description', 't.description', 't.notes', 't.completed')
.where('t.project_id', id)
}

function findTask(id) {
  return db('tasks').where({ id }).first()
}

function newTask(task) {
  return db('tasks')
    .insert(task, 'id')
    .then(([id]) => {
      return findTask(id)
    }
  )
}

/*
  - [x] adding resources.
  - [x] retrieving a list of resources.
  - [x] adding projects.
  - [x] retrieving a list of projects.
  - [x] adding tasks.
  - [x] retrieving a list of tasks. **The list of tasks should include the project name and project description**.
*/