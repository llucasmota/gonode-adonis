'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectSchema extends Schema {
  up () {
    this.create('projects', table => {
      table.increments()
      table
        .integer('user_id')
        .unsigned() // não poderá ter valores negativos
        .references('id') // campo id será uma referência de outro campo em outra tabela
        .inTable('users') // o campo referência de id está na tabela users
        .onUpdate('CASCADE') // se houver alteração em users é executado cascade
        .onDelete('SET NULL') // em caso de delete do usuário
      table.string('title').notNullable()
      table.text('description').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('projects')
  }
}

module.exports = ProjectSchema
