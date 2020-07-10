'use strict'

const BaseModel = use('MongooseModel')

/**
 * @class accounts
 */
class accounts extends BaseModel {
  static boot ({ schema }) {
    // Hooks:
    // this.addHook('preSave', () => {})
    // Indexes:
    // this.index({}, {background: true})
    // Virtuals, etc:
    // schema.virtual('something').get(.......)
  }
  /**
   * accounts's schema
   */
  static get schema () {
    return {
        account_id:Number,
        limit:Number,
        products:{
            type:Array,
            default:[]
        }
    }
  }
}

module.exports = accounts.buildModel('accounts')