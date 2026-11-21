const mongoose = require("mongoose");
const { StructError } = require("superstruct");
const HttpException = require("../exceptions/HttpException");
const BadRequestException = require("../exceptions/BadRequestException");
const InternalServerErrorException = require("../exceptions/InternalServerErrorException");

const errorHandler = (err, req, res, next) => {
  console.log(err);

  let exceptions = err;
  if (err instanceof StructError) {
    exceptions = new BadRequestException(err.message);
  } else if (
    err instanceof mongoose.Error.CastError ||
    err instanceof mongoose.Error.ValidationError
  ) {
    exceptions = new BadRequestException(err.message);
  } else if (err.code === 11000) {
    exceptions = new BadRequestException(
      `이미 사용중인 ${Object.keys(err.keyValue)[0]}입니다.`,
    );
  } else if (!(err instanceof HttpException)) {
    exceptions = new InternalServerErrorException(err.message);
  }
  res.status(exceptions.status).json({
    name: exceptions.name,
    message: exceptions.message,
  });
};

module.exports = errorHandler;
