const express = require('express');
const Projects = require('./project-model.js');
const router = express.Router();

// get all projects
router.get('/', (req, res) => {
  Projects.getProjects()
  .then(projects => {
    res.json(projects);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get projects', data: err });
  });
});

// add a new project
router.post('/', (req, res) => {
  const newProject = req.body
  // make sure the body exists
  if(newProject) {
    Projects.newProject(newProject)
    .then(response => {
      res.status(201).json(response)
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to add project', data: err })
    })
  }
})

// get all resources
router.get('/resources', (req, res) => {
  Projects.getResources()
  .then(resources => {
    if(resources) {
      res.status(200).json(resources)
    }
    else {
      res.status(404).json({ message: 'No resources available' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get resources', data: err });
  })
})

// add resource for projects
router.post('/resource', (req, res) => {

  const newResource = {
    name: req.body.name,
    description: req.body.description
  }

  const ids = {
    project_id: req.body.project_id,
    resource_id: req.body.resource_id
  }

  if(req.body) {
    Projects.newResource(newResource, ids)
    .then(response => {
      console.log(response)
      res.status(201).json(response)
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to add resource', data: err })
    })
  }

})

// add a task to a project
router.post('/:id/task', (req, res) => {
  const newTask = req.body
  const id = req.params.id
  newTask.project_id = id

  // check if the project exists
  Projects.findProject(id)
  .then(response => {
    if(!response) {
      res.status(404).json({ message: 'No project at that ID', data: response })
    } else {
      if(newTask) {
        Projects.newTask(newTask)
        .then(response => {
          res.status(201).json(response)
        })
        .catch(err => {
          res.status(500).json({ message: 'Failed to add task', data: err })
        })
      } else {
        res.status(400).json({ message: 'Missing body' })
      }
    }
  })
})

// get all tasks for a project
router.get('/:id/tasks', (req, res) => {
  const id = req.params.id

  // check if the project exists
  Projects.findProject(id)
  .then(response => {
    if(!response) {
      res.status(404).json({ message: 'No project at that ID', data: response})
    } else {
      Projects.getTasks(id)
      .then(task_res => {
        res.status(200).json(task_res)
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to get tasks', data: err })
      })
    }
  })
})

module.exports = router;