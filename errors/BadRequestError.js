const { BADREQUEST_ERROR } = require('../utils/statusErrors');

class BadRequestError extends Error {
  constructor(message) {
    super(message);

    this.statusCode = BADREQUEST_ERROR;
  }
}

module.exports = BadRequestError;
