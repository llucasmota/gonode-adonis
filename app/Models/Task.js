'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Task extends Model {
  project () {
    return this.belongsTo('App/Model/Project')
  }
  user () {
    return this.belongsTo('App/Model/User')
  }
  file () {
    return this.belongsTo('App/Model/File')
  }
}

module.exports = Task
