const _ = {};

_.identity = input => {
  return input;
};

_.first = (input, n) => {
  if (typeof input === "string") {
    input = input.split("");
  }
  if (Array.isArray(input)) {
    if (n) return input.slice(0, n);
    return input[0];
  }
  return undefined;
};

_.last = (input, n) => {
  if (typeof input === "string") {
    input = input.split("");
  }
  if (Array.isArray(input)) {
    if (n) return input.slice(input.length - n, input.length);
    return input[input.length - 1];
  }
  return undefined;
};

module.exports = _;
