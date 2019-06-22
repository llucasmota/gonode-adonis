'use strict'

const TaskHook = (exports = module.exports = {})
const Mail = use('Mail')
const Helpers = use('Helpers')

TaskHook.sendNewTaskMail = async taskInstance => {
  // se a tarefa não possui user.id OU foi enviado um user.id para persistir(ou seja a tarefa tem um novo user.id)
  if (!taskInstance.user_id && !taskInstance.dirty.user_id) return

  // recuperando dados que serão utilizados

  const { email, username } = await taskInstance.user().fetch()
  const file = await taskInstance.file().fetch()
  console.log(file)
  const { title } = await taskInstance

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
}
