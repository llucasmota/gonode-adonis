'use strict'

const TaskHook = (exports = module.exports = {})

TaskHook.sendNewTaskMail = async taskInstance => {
  // se a tarefa não possui user.id OU foi enviado um user.id para persistir(ou seja a tarefa tem um novo user.id)
  if (!taskInstance.user_id || !taskInstance.dirty.user_id) return
  console.log('EXECUTOU')
}
