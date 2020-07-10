'use strict'

const BaseModel = use('MongooseModel')

/**
 * @class customers
 */
class customers extends BaseModel {
  static boot ({ schema }) {
    // Hooks:
    // this.addHook('preSave', () => {})
    // Indexes:
    // this.index({}, {background: true})
    // Virtuals, etc:
    // schema.virtual('something').get(.......)
  }
  /**
   * customers's schema
   */
  static get schema () {
    return {
      name:String,
      username:String,
      email:String,
      accounts:{
        type:Array,
        default:[]
      }
    }
  }
}

module.exports = customers.buildModel('customers')