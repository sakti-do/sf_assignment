'use strict'

const transactions=use('App/Models/transactions')

class SyncDataController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }
  async onSelect_account (message) {
    const txnData = await transactions.findOne({account_id:message.id})
    this.socket.broadcastToAll('select_account', {id:message.id,data:txnData})
  }
}

module.exports = SyncDataController
