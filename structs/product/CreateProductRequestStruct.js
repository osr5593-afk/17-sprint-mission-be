const {
  object,
  string,
  size,
  coerce,
  number,
  min,
  array,
  defaulted,
} = require("superstruct");

const trimmedName = coerce(size(string(), 1, 10), string(), (value) =>
  value.trim(),
);
const trimmedDescription = coerce(size(string(), 10, 100), string(), (value) =>
  value.trim(),
);
const tag = coerce(size(string(), 1, 5), string(), (value) => value.trim());

const CreateProductRequestStruct = object({
  name: trimmedName,
  description: trimmedDescription,
  price: min(number(), 0),
  tags: defaulted(array(tag), []),
});

module.exports = CreateProductRequestStruct;
