'use strict'

const Antl = use('Antl')

class User {
  get validateAll () {
    return true
  }
  get rules () {
    return {
      username: 'required|unique:users',
      email: 'required|email|unique:users',
      password: 'required|confirmed'
    }
  }
  /**
   * Recupera as mensagens internacionalizadas presentes no locales/en
   */
  get messages () {
    return Antl.list('validation')
  }
}

module.exports = User
