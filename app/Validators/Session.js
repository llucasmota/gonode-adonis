'use strict'

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
}

module.exports = Session
