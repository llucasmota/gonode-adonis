'use strict'

const Project = use('App/Models/Project')

class ProjectController {
  async index ({ request, response }) {
    try {
      const { page } = request.get()
      const project = await Project.query()
        .with('user')
        .paginate(page)

      return project
    } catch (err) {
      console.log(err)
      return response
        .status(err.status)
        .send({ error: { message: 'Algo deu errado' } })
    }
  }

  async store ({ request, response, auth }) {
    const data = request.only(['title', 'description'])

    const project = await Project.create({ ...data, user_id: auth.user.id })

    return project
  }

  async show ({ request, params, response }) {
    try {
      const project = await Project.findOrFail(params.id)

      await project.load('user')
      await project.load('tasks')
      return project
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Algo deu errado' } })
    }
  }

  async update ({ params, request, response }) {
    const project = await Project.findOrFail(params.id)
    const data = request.only(['title', 'description'])

    project.merge(data)
    await project.save()

    return project
  }

  async destroy ({ params, request, response }) {
    const project = await Project.findOrFail(params.id)

    await project.delete()
  }
}

module.exports = ProjectController
