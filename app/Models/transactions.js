'use strict'

const BaseModel = use('MongooseModel')

/**
 * @class transactions
 */
class transactions extends BaseModel {
  static boot ({ schema }) {
    // Hooks:
    // this.addHook('preSave', () => {})
    // Indexes:
    // this.index({}, {background: true})
    // Virtuals, etc:
    // schema.virtual('something').get(.......)
  }
  /**
   * transactions's schema
   */
  static get schema () {
    return {
        account_id:Number,
        transaction_count:Number,
        bucket_start_date:Date,
        bucket_end_date:Date,
        transactions:{
            type:Array,
            default:[]
        }
    }
  }
}

module.exports = transactions.buildModel('transactions')