const {
  object,
  string,
  integer,
  min,
  max,
  coerce,
  defaulted,
  enums,
  optional,
} = require("superstruct");

const positiveInteger = coerce(min(integer(), 1), string(), (value) =>
  /^\d+$/.test(value) ? Number(value) : NaN,
);
const pageSize = coerce(max(min(integer(), 1), 50), string(), (value) =>
  /^\d+$/.test(value) ? Number(value) : NaN,
);
module.exports = object({
  page: defaulted(positiveInteger, 1),
  pageSize: defaulted(pageSize, 10),
  orderBy: defaulted(enums(["recent"]), "recent"),
  keyword: optional(string()),
});
