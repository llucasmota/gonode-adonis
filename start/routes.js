'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store')
Route.post('sessions', 'SessionController.store')
Route.post('passwords', 'ForgotPasswordController.store')
Route.put('passwords', 'ForgotPasswordController.update')
// Route.post('files', 'FileController.store')
Route.get('/files/:id', 'FileController.show')

Route.group(() => {
  Route.post('files', 'FileController.store')
  Route.resource('projects', 'ProjectController').apiOnly()
})
// Route.get('project', 'ProjectController.index')
/**
 * Disponibilizar todas as rotas numa única linha
 */
