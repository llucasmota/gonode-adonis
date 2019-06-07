'use strict'

const Task = use('App/Models/Task')

class TaskController {
  async index ({ params, request, response, view }) {
    const task = await Task.query()
      .where('project_id', params.projects_id)
      .with('user')
      .fetch()

    return task
  }

  async create ({ params, request, response, view }) {
    const data = request.only([
      'user_id',
      'file_id',
      'title',
      'description',
      'due_date'
    ])
    const task = await Task.create({ ...data, project_id: params.projects_id })

    return task
  }

  async store ({ request, response }) {}

  async show ({ params, request, response, view }) {}

  async edit ({ params, request, response, view }) {}

  async update ({ params, request, response }) {}

  async destroy ({ params, request, response }) {}
}

module.exports = TaskController
