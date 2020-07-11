'use strict'
const customers=use('App/Models/customers')
const accounts=use('App/Models/accounts')
const transactions=use('App/Models/transactions')
class ProfileController {
    async index({response, session, view}){
        const user = await customers.findOne({email:await session.get('sf_user_email',null)})
        if(user !== null){
            return view.render('profile',{ username:user.username, name: user.name, email: user.email,accounts:user.accounts})
        } else {
            await session.pull('sf_user_token')
            session.withErrors({username:'Session has been expired'}).flashAll()
            return response.route('login')
        }       

    }
    async getAccountProducts({request,response}){
        const product = await accounts.findOne({account_id:request.body.id})
        return response.status(200).json(
            {
                error:0,
                data:product
            }
        )
    }
    async updateTXN({request,response}){
        const txnData = await transactions.findOne({account_id:request.body.accId},function(err, doc){
            if(!err){
                let symArr = ["csco", "intc", "crm", "nvda", "amd", "nflx", "sap", "bb", "artigo", "iqoo", "ML", "AI"];
                let randSym = symArr[Math.floor(Math.random() * symArr.length)];

                let txn = doc.transactions;
                let randType = Math.random() * 10;
                let randPrice = Math.floor(Math.random() * 100) + 1;
                let randAmount = Math.floor(Math.random() * 1000) + 1;
                txn.push({
                    date:new Date(),
                    amount:randAmount,
                    transaction_code: randType > 1 ? 'buy':'sell',
                    symbol:randSym,
                    price:String(randPrice),
                    total:String((randAmount * randPrice))                    
                });
                doc.transactions = txn;
                doc.transaction_count = doc.transaction_count + 1;
                doc.save();
            }
        })

        return response.status(200).json(
            {
                error:0,
                msg:'updated',
                data:txnData
            }
        )
    }
}

module.exports = ProfileController
