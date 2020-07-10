'use strict'

const customers=use('App/Models/customers')

class AuthController {
    async login({request,response, session}){
        const body = request.body
        const user = await customers.find({ email: body.email, username: body.password})
        if(user.length){
            const uid = Date.now()+user[0].username;
            await session.put('sf_user_token',uid)
            await session.put('sf_user_email',user[0].email)
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
