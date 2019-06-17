'use strict'

const Antl = use('Antl')

class Session {
  get validateAll () {
    return true
  }
  get rules () {
    return {
      // validation rules
      email: 'required|email', // obrigatório e precisa estar no formato de email
      password: 'required'
    }
  }
  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Session
