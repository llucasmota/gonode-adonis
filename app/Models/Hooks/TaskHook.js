'use strict'

const TaskHook = (exports = module.exports = {})
const Kue = use('Kue')
const Job = use('App/Jobs/NewTaskMail')

TaskHook.sendNewTaskMail = async taskInstance => {
  // se a tarefa não possui user.id OU foi enviado um user.id para persistir(ou seja a tarefa tem um novo user.id)
  if (!taskInstance.user_id && !taskInstance.dirty.user_id) return

  // recuperando dados que serão utilizados

  const { email, username } = await taskInstance.user().fetch()
  const file = await taskInstance.file().fetch()
  console.log(file)
  const { title } = await taskInstance

  Kue.dispatch(Job.key, { email, username, file, title }, { attempts: 3 })
}
