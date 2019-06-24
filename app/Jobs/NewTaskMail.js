'use strict'

const Mail = use('Mail')
const Helpers = use('Helpers')

class NewTaskMail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  // Configura quantos desses jobs irei executar de uma vez
  static get concurrency () {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key () {
    return 'NewTaskMail-job'
  }

  // This is where the work is done.
  async handle ({ username, title, file, email }) {
    await Mail.send(
      ['emails.new_task'],
      { username, title, hasAttachment: !!file }, // !! transforma em booleano o retorno, se tiver arquivo retorna true)
      message => {
        message
          .to(email)
          .from('lucas.mota@adonis.com', 'Lucas Mota | AdonisJS')
          .subject('Há uma nova tarefa para voce')

        if (file) {
          message.attach(Helpers.tmpPath(`uploads/${file.file}`), {
            filename: file.name
          })
        }
      }
    )
    console.log('NewTaskMail-job started')
  }
}

module.exports = NewTaskMail
