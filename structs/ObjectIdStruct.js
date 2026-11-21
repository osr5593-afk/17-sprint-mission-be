const { object, refine, string } = require("superstruct");
const { isValidObjectId } = require("mongoose");

const ObjectIdStruct = object({
  id: refine(string(), "ObjectId", (value) => isValidObjectId(value)),
});

module.exports = ObjectIdStruct;
