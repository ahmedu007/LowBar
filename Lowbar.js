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

_.each = (list, iteratee, context) => {
  if (!context) context = this;
  if (Array.isArray(list) || typeof list === "string") {
    for (let i = 0; i < list.length; i++) {
      iteratee.call(context, list[i], i, list);
    }
  } else {
    for (let key in list) {
      iteratee.call(context, list[key], key, list);
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

_.filter = (list, predicate, context) => {
  if (!context) context = this;
  if (!Array.isArray(list)) return [];
  let results = [];
  for (let i = 0; i < list.length; i++) {
    if (predicate.call(context, list[i])) {
      results.push(list[i]);
    }
  }
  return results;
};

_.reject = (list, predicate, context) => {
  if (!context) context = this;
  if (!Array.isArray(list)) return [];
  let results = [];
  for (let i = 0; i < list.length; i++) {
    if (!predicate.call(context, list[i])) {
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

_.map = (input, fn, context) => {
  let result = [];
  if (!context) context = this;
  if (typeof input === "object" && !Array.isArray(input)) {
    for (let key in input) {
      result.push(fn.call(context, input[key]));
    }
  }
  for (let i = 0; i < input.length; i++) {
    result.push(fn.call(context, input[i]));
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

_.reduce = (list, iteratee, memo, context) => {
  if (!context) context = this;
  _.each(list, function(item) {
    if (memo === undefined) {
      return (memo = list[0]);
    } else {
      return (memo = iteratee.call(context, memo, item));
    }
  });
  return memo;
};

_.once = fn => {
  if (typeof fn !== "function") return fn;
  let alreadyCalled = false;
  let returnValue;

  if (alreadyCalled) return returnValue;

  return () => {
    if (!alreadyCalled) {
      alreadyCalled = true;
      returnValue = fn.apply(null, arguments);
    }
    return returnValue;
  };
};

_.shuffle = input => {
  let result = [];
  if (!Array.isArray(input) && typeof input === "object") {
    for (let key in input) {
      result.push(input[key]);
    }
    input = result;
  }
  if (typeof input === "string") {
    input = input.split("");
  }
  if (Array.isArray(input)) {
    for (let i = 0; i < input.length; i++) {
      let j = Math.floor(Math.random() * (i + 1));
      [input[i], input[j]] = [input[j], input[i]];
    }
    return input;
  }
  return result;
};

_.invoke = (list, methodName, ...args) => {
  const results = [];
  const cb = value => {
    results.push(value[methodName].apply(value, args));
  };
  _.each(list, cb);
  return results;
};

_.sortBy = (list, iteratee, context) => {
  if (!context) context = this;
  if (typeof iteratee === "function") {
    return list.sort((a, b) => {
      return iteratee.call(context, a) - iteratee.call(context, b);
    });
  } else {
    return list.sort((a, b) => {
      if (a[iteratee] < b[iteratee]) return -1;
      if (a[iteratee] > b[iteratee]) return 1;
      return 0;
    });
  }
};

_.zip = function() {
  const results = [];
  if (Array.isArray(arguments[0])) {
    for (var i = 0; i < arguments[0].length; i++) {
      var resultsPrior = [];
      for (var j = 0; j < arguments.length; j++) {
        resultsPrior.push(arguments[j][i]);
      }
      results.push(resultsPrior);
      resultsPrior = [];
    }
  }
  return results;
};

_.sortedIndex = (list, value, iteratee, context) => {
  if (!context) context = this;
  if (!Array.isArray(list) && typeof list !== "object") return list;

  if (iteratee) {
    return binarySearch(_.sortBy(list, iteratee), value);
  } else {
    return binarySearch(list, value);
  }
};

_.flatten = arr => {
  return arr.reduce((flat, toFlatten) => {
    return flat.concat(
      Array.isArray(toFlatten) ? _.flatten(toFlatten) : toFlatten
    );
  }, []);
};

_.intersection = (...arrays) => {
  let result = [];
  let i, j;

  for (i = 0; i < arrays[0].length; i++) {
    let item = arrays[0][i];
    if (_.contains(result, item)) continue;
    for (j = 1; j < arrays.length; j++) {
      if (!_.contains(arrays[j], item)) break;
    }
    if (j === arrays.length) result.push(item);
  }
  return result;
};

_.difference = (array, list) => {
  let arrays = _.flatten(list, true);
  return array.filter(val => {
    return !_.contains(arrays, val);
  });
};

_.memoize = passedFunc => {
  var cache = {};
  return x => {
    if (x in cache) return cache[x];
    return (cache[x] = passedFunc(x));
  };
};

_.negate = predicate => {
  return x => {
    return !predicate(x);
  };
};

_.values = obj => {
  let result = [];
  if (Array.isArray(obj)) return obj;
  if (typeof obj === "object") {
    for (let key in obj) {
      result.push(obj[key]);
    }
  }
  return result;
};

_.every = (list, predicate, context) => {
  if (!context) context = this;
  if (typeof predicate === "function") {
    for (let i = 0; i < list.length; i++) {
      if (predicate.call(context, list[i]) !== true) return false;
    }
  }
  return true;
};

_.some = (list, predicate, context) => {
  if (!context) context = this;
  if (typeof predicate === "function" && Array.isArray(list)) {
    for (let i = 0; i < list.length; i++) {
      if (predicate.call(context, list[i])) return true;
    }
  }
  if (typeof predicate === "function" && typeof list === "object") {
    for (let key in list) {
      if (predicate.call(context, list[key])) return true;
    }
  }
  return false;
};

_.partial = function(func, args) {
  args = [].slice.call(arguments, 1);
  return function() {
    let position = 0;
    let length = args.length;
    let newArgs = Array(length);
    for (let i = 0; i < length; i++) {
      if (args[i] === _) {
        newArgs[i] = arguments[position++];
      } else {
        newArgs[i] = args[i];
      }
    }
    while (position < arguments.length) newArgs.push(arguments[position++]);
    return func(...newArgs);
  };
};

_.delay = function(func, ms, args) {
  args = [].slice.call(arguments, 2);
  return setTimeout(() => {
    func.apply(null, args);
  }, ms);
};

_.where = (array, properties) => {
  return array.filter(values => {
    let count = 0;
    for (let key in properties) {
      if (values[key] === properties[key]) {
        count++;
      }
    }
    if (count === Object.keys(properties).length) return values;
  });
};

_.extend = (object, sources) => {
  return Object.assign({}, object, sources);
};

_.defaults = (object, defaults) => {
  const objKeys = Object.keys(object);
  for (let key in defaults) {
    if (!_.contains(objKeys, key)) {
      object[key] = defaults[key];
    }
  }
  return object;
};

_.throttle = () => {};

module.exports = _;

function binarySearch(list, name) {
  let start = 0;
  let end = list.length - 1;

  for (let i = 0; i < 10; i++) {
    var mid = Math.floor((end + start) / 2);

    if (list[mid] === name) {
      return mid;
    }
    if (name < list[mid]) {
      end = mid - 1;
    }
    if (name > list[mid]) {
      start = mid + 1;
    }
  }

  return mid + 1;
}
