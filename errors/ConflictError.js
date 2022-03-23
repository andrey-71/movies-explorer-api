const { CONFLICT_ERROR } = require('../utils/statusErrors');

class ConflictError extends Error {
  constructor(message) {
    super(message);

    this.statusCode = CONFLICT_ERROR;
  }
}

module.exports = ConflictError;
