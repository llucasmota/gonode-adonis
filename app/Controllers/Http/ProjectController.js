'use strict'

const Project = use('App/Models/Project')

class ProjectController {
  async index ({ request, response, view }) {
    const project = await Project.all()

    return project
  }

  async store ({ request, response }) {}

  async show ({ params, request, response, view }) {}

  async update ({ params, request, response }) {}

  async destroy ({ params, request, response }) {}
}

module.exports = ProjectController
