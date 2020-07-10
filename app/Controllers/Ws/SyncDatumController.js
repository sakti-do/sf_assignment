'use strict'

class SyncDataController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }
}

module.exports = SyncDataController
