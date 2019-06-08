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

  async store ({ params, request, response }) {
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

  async show ({ params, request, response, view }) {
    const task = await Task.findOrFail(params.id)

    return task
  }

  async update ({ params, request, response }) {
    try {
      const task = await Task.findOrFail(params.id)
      const data = request.only([
        'user_id',
        'title',
        'file_id',
        'description',
        'due_date'
      ])
      task.merge(data)
      await task.save()
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Algo deu errado' } })
    }
  }

  async destroy ({ params, request, response }) {
    const task = await Task.findOrFail(params.id)

    await task.delete()
  }
}

module.exports = TaskController
