'use strict'
const crypto = require('crypto')
const User = use('App/Models/User')
const Mail = use('Mail')

class ForgotPasswordController {
  async store ({ request, response }) {
    try {
      const email = request.input('email')
      /** usando o findByOrFail o adonis realiza a operação caso  */
      const user = await User.findByOrFail('email', email)
      /**
       * Crypto cria um token com tamanho de 10 bytes, hexadecimal
       */
      user.token = crypto.randomBytes(10).toString('hex')
      user.token_created_at = new Date()

      await user.save()

      await Mail.send(
        ['emails.forgot_password'],
        {
          email,
          token: user.token,
          link: `${request.input('redirect_url')}?token=${user.token}`
        },
        message => {
          message
            .from('adm.mota@gmail.com | #talkei')
            .to(user.email)
            .subject('recuperação de senha')
            .text('enviando email')
        }
      )
    } catch (err) {
      console.log(err)
      response
        .status(err.status)
        .send({ error: { message: 'Algo não deu certo' } })
    }
  }
}

module.exports = ForgotPasswordController
