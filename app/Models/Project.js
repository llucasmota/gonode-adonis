'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Project extends Model {
  user () {
    /**
     * Representando que um Projeto pertence a um usuário
     */
    return this.belongsTo('App/Models/User')
  }
  tasks () {
    /**
     * Representando que um projeto pode ter várias tarefas
     */
    return this.hasMany('App/Model/Task')
  }
}

module.exports = Project
