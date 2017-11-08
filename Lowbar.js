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

_.each = (list, iteratee) => {
  if (Array.isArray(list) || typeof list === "string") {
    for (let i = 0; i < list.length; i++) {
      iteratee(list[i], i, list);
    }
  } else {
    for (let key in list) {
      iteratee(list[key], key, list);
    }
  }
};

_.indexOf = (array, value, boolean) => {
  if (!Array.isArray(array)) return -1;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) return i;
  }
  return -1;
};

module.exports = _;
