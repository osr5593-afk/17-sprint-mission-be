const HttpException = require("./HttpException");

class BadRequestException extends HttpException {
  constructor(message) {
    super({
      status: 400,
      name: "Bad Request",
      message,
    });
  }
}

module.exports = BadRequestException;
