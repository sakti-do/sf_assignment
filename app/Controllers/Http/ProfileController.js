'use strict'
const customers=use('App/Models/customers')
const accounts=use('App/Models/accounts')

class ProfileController {
    async index({response, session, view}){
        const user = await customers.find({email:await session.get('sf_user_email',null)})
        if(user.length){
            return view.render('profile',{ name: user[0].name, email: user[0].email,accounts:user[0].accounts})
        } else {
            await session.pull('sf_user_token')
            session.withErrors({username:'Session has been expired'}).flashAll()
            return response.route('login')
        }       

    }
    async getAccountProducts({request,response}){
        const product = await accounts.where({account_id:request.body.id}).findOne()
        return response.status(200).json(
            {
                error:0,
                data:product
            }
        )
    }
}

module.exports = ProfileController
