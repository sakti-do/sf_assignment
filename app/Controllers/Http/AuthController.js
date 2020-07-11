'use strict'

const customers=use('App/Models/customers')

class AuthController {
    async login({request,response, session}){
        const body = request.body
        const user = await customers.findOne({ email: body.email, username: body.password})
        if(user!==null){
            const uid = Date.now()+user.username;
            await session.put('sf_user_token',uid)
            await session.put('sf_user_email',user.email)
            return response.route('profile')
        } else {
            session.withErrors({username:'Username/Password is wrong'}).flashAll()
            return response.redirect('back')
        }        
        
    }
    async logout({request, response, session}){
        await session.clear()
        return response.route('login')
    }
}

module.exports = AuthController
