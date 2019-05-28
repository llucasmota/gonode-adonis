'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TaskSchema extends Schema {
  up () {
    this.create('tasks', table => {
      table.increments()
      table
        .integer('project_id')
        .unsigned() // não poderá ter valores negativos
        .notNullable()
        .references('id') // campo id será uma referência de outro campo em outra tabela
        .inTable('users') // o campo referência de id está na tabela users
        .onUpdate('CASCADE') // se houver alteração em users é executado cascade
        .onDelete('CASCADE') // em caso de delete do usuário
      table
        .integer('user_id')
        .unsigned() // não poderá ter valores negativos
        .references('id') // campo id será uma referência de outro campo em outra tabela
        .inTable('users') // o campo referência de id está na tabela users
        .onUpdate('CASCADE') // se houver alteração em users é executado cascade
        .onDelete('SET NULL') // em caso de delete do usuário
      table
        .integer('file_id')
        .unsigned() // não poderá ter valores negativos
        .references('id') // campo id será uma referência de outro campo em outra tabela
        .inTable('files') // o campo referência de id está na tabela users
        .onUpdate('CASCADE') // se houver alteração em users é executado cascade
        .onDelete('SET NULL') // em caso de delete do usuário
      table.string('title').notNullable()
      table.text('description')
      table.timestamp('due_date')
      table.timestamps() // com s no final cria updated_at e created_at
    })
  }

  down () {
    this.drop('tasks')
  }
}

module.exports = TaskSchema
