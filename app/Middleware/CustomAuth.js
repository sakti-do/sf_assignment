'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class CustomAuth {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, session, response }, next) {
    // call next to advance the request
    if(session.get('sf_user_token',null)===null){
      if(request.body.isAjax=='1'){
        session.withErrors({username:'Session has been expired'}).flashAll()
        return response.status(200).json({error:1,msg:'Session expired'})
      } else {
        return response.route('login')
      }
    }
    await next()
  }

  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async wsHandle ({ request, session, response }, next) {
    // call next to advance the request
    if(session.get('sf_user_token',null)===null){
      return response.route('login')
    }
    await next()
  }
}

module.exports = CustomAuth
