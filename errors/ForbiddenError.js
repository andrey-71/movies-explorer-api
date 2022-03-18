const { FORBIDDEN_ERROR } = require('../utils/statusErrors');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);

    this.statusCode = FORBIDDEN_ERROR;
  }
}

module.exports = ForbiddenError;
