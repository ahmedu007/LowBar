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

_.filter = (list, predicate) => {
  if (!Array.isArray(list)) return [];
  let results = [];
  for (let i = 0; i < list.length; i++) {
    if (predicate(list[i])) {
      results.push(list[i]);
    }
  }
  return results;
};

_.reject = (list, predicate) => {
  if (!Array.isArray(list)) return [];
  let results = [];
  for (let i = 0; i < list.length; i++) {
    if (!predicate(list[i])) {
      results.push(list[i]);
    }
  }
  return results;
};

_.uniq = array => {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    if (!result.includes(array[i])) {
      result.push(array[i]);
    }
  }
  return result;
};

_.map = (input, fn) => {
  let result = [];
  if (typeof input === "object" && !Array.isArray(input)) {
    for (let key in input) {
      result.push(fn(input[key]));
    }
  }
  for (let i = 0; i < input.length; i++) {
    result.push(fn(input[i]));
  }
  return result;
};

_.contains = (input, value) => {
  if (typeof input === "object" && !Array.isArray(input)) {
    for (let key in input) {
      if (input[key] === value) return true;
    }
  }
  for (let i = 0; i < input.length; i++) {
    if (input[i] === value) return true;
  }
  return false;
};

_.pluck = (list, property) => {
  let result = [];
  if (Array.isArray(list)) {
    for (let i = 0; i < list.length; i++) {
      for (let key in list[i]) {
        if (key === property) {
          result.push(list[i][key]);
        }
      }
    }
  }
  return result;
};

module.exports = _;
