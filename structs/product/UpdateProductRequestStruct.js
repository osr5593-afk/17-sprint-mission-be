const { partial } = require("superstruct");
const CreateProductRequestStruct = require("./CreateProductRequestStruct");

module.exports = partial(CreateProductRequestStruct);
