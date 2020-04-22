'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class ForibiddenAccessException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle(error, { response }) {
    return response.status(403).json({
      error: "Foribidden Access"
    })

  }
}

module.exports = ForibiddenAccessException
