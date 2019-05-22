'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FileSchema extends Schema {
  up () {
    this.create('files', table => {
      table.increments()
      table.string('file').notNullable() // file guarda o nome do arquivo fisico
      table.string('name').notNullable() // guarda o nome que o usuário informou para o arquivo
      table.string('type', 20) // tipo: pdf, imagem, etc...
      table.string('subtype', 20)
      table.timestamps()
    })
  }

  down () {
    this.drop('files')
  }
}

module.exports = FileSchema
