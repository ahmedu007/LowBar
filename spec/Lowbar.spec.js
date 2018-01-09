const expect = require("chai").expect;
const path = require("path");
const _ = require(path.join(__dirname, "..", "./Lowbar.js"));
const sinon = require("sinon");

describe("_", () => {
  "use strict";

  it("is an object", () => {
    expect(_).to.be.an("object");
  });

  describe("#identity", () => {
    it("returns the same output as the argument", () => {
      expect(_.identity("hello")).to.equal("hello");
      expect(_.identity(123)).to.equal(123);
      expect(_.identity([1, 2, "3", 4, 5])).to.eql([1, 2, "3", 4, 5]);
      expect(_.identity(true)).to.eql(true);
      expect(_.identity({ name: "Tom" })).to.eql({ name: "Tom" });
    });
  });

  describe("#first", () => {
    it("returns undefined for invalid input", () => {
      expect(_.first()).to.eql(undefined);
    });
    it("returns the first index of the array", () => {
      expect(_.first([1, 2, 3])).to.eql(1);
      expect(_.first(["A", "B", "C"])).to.eql("A");
    });
    it("returns the first n elements of the array when a 2nd argument is given.", () => {
      expect(_.first([1, 2, 3, 4], 2)).to.eql([1, 2]);
      expect(_.first([1, 2, "3", "4", 5, 6, 7], 4)).to.eql([1, 2, "3", "4"]);
      expect(_.first([1, 2, "3", { name: "catch" }, 5, 6, 7], 4)).to.eql([
        1,
        2,
        "3",
        { name: "catch" }
      ]);
    });
    it("returns the first character of a string", () => {
      expect(_.first("hello")).to.eql("h");
    });
    it("returns the first n characters of a string when n is defined", () => {
      expect(_.first("hello", 3)).to.eql(["h", "e", "l"]);
    });
    it("returns the first n characters of a string when n is defined", () => {
      expect(_.first("hello world. I am a function", 22)).to.eql([
        "h",
        "e",
        "l",
        "l",
        "o",
        " ",
        "w",
        "o",
        "r",
        "l",
        "d",
        ".",
        " ",
        "I",
        " ",
        "a",
        "m",
        " ",
        "a",
        " ",
        "f",
        "u"
      ]);
    });
  });

  describe("#last", () => {
    it("returns undefined for invalid input", () => {
      expect(_.last()).to.eql(undefined);
    });
    it("returns the last index of the array", () => {
      expect(_.last([1, 2, 3])).to.eql(3);
      expect(_.last(["A", "B", "C"])).to.eql("C");
    });
    it("returns the last n elements of the array when a 2nd argument is given.", () => {
      expect(_.last([1, 2, 3, 4], 2)).to.eql([3, 4]);
      expect(_.last([1, 2, "3", "4", 5, 6, 7], 4)).to.eql(["4", 5, 6, 7]);
      expect(_.last([4, 5, 1, 2, "3", { name: "catch" }], 4)).to.eql([
        1,
        2,
        "3",
        { name: "catch" }
      ]);
    });
    it("returns the last character of a string", () => {
      expect(_.last("hello")).to.eql("o");
    });
    it("returns the last n characters of a string when n is defined", () => {
      expect(_.last("hello", 3)).to.eql(["l", "l", "o"]);
    });
    it("returns the last n characters of a string when n is defined", () => {
      expect(_.last("hello world. I am a function", 22)).to.eql([
        "w",
        "o",
        "r",
        "l",
        "d",
        ".",
        " ",
        "I",
        " ",
        "a",
        "m",
        " ",
        "a",
        " ",
        "f",
        "u",
        "n",
        "c",
        "t",
        "i",
        "o",
        "n"
      ]);
    });
  });

  describe("#each", () => {
    it("it should count the number of iterations in the function", () => {
      const spy = sinon.spy();
      _.each([1, 2, 3], spy);
      expect(spy.callCount).to.equal(3);
    });
    it("calls the iteratee passing each element of the array as the first argument", () => {
      const spy = sinon.spy();
      _.each([1, 2, 3], spy);
      expect(spy.firstCall.calledWithExactly(1, 0, [1, 2, 3])).to.equal(true);
      expect(spy.secondCall.calledWithExactly(2, 1, [1, 2, 3])).to.equal(true);
      expect(spy.thirdCall.calledWithExactly(3, 2, [1, 2, 3])).to.equal(true);
    });
    it("calls the iteratee for each key value pair in an object", () => {
      const spy = sinon.spy();
      _.each({ one: 1, two: 2, three: 3 }, spy);
      expect(spy.callCount).to.equal(3);
      expect(
        spy.firstCall.calledWithExactly(1, "one", { one: 1, two: 2, three: 3 })
      ).to.equal(true);
      expect(
        spy.secondCall.calledWithExactly(2, "two", { one: 1, two: 2, three: 3 })
      ).to.equal(true);
      expect(
        spy.thirdCall.calledWithExactly(3, "three", {
          one: 1,
          two: 2,
          three: 3
        })
      ).to.equal(true);
    });
  });

  describe("#indexOf", () => {
    it("return the index of the value in the array", () => {
      expect(_.indexOf([1, 2, 3, "a"], 3)).to.equal(2);
      expect(_.indexOf([1, 2, 3, "a"], "a")).to.equal(3);
    });
    it("return -1 if value is not present in the array", () => {
      expect(_.indexOf([1, 2, 3, "a"], 4)).to.equal(-1);
    });
    it("returns -1 when invalid inputs are given", () => {
      expect(_.indexOf()).to.equal(-1);
    });
    it("uses a faster binary search if isSorted is true", () => {
      expect(_.indexOf([1, 2, 3, 4, 5, 6, 7, 8], 7, true)).to.equal(6);
    });
  });

  describe("#filter", () => {
    it("returns an empty array for invalid arguments", () => {
      expect(_.filter("test")).to.eql([]);
      expect(_.filter(4)).to.eql([]);
    });
    it("returns an array of all the values that pass a truth test", () => {
      expect(
        _.filter([1, 2, 3, 4], num => {
          return num % 2 === 0;
        })
      ).to.eql([2, 4]);
      expect(
        _.filter([1, "a", 3, "b"], elem => {
          return typeof elem === "string";
        })
      ).to.eql(["a", "b"]);
      expect(
        _.filter([1, "a", 3, "b"], elem => {
          return typeof elem === "number";
        })
      ).to.eql([1, 3]);
    });
    it("expects callback to be called on each element of passed array", () => {
      const spy = sinon.spy();
      _.filter(["A", "B", "C"], spy);
      expect(spy.callCount).to.equal(3);
    });
  });

  describe("#reject", () => {
    it("returns an empty array for invalid arguments", () => {
      expect(_.reject("test")).to.eql([]);
      expect(_.reject({})).to.eql([]);
      expect(_.reject(4)).to.eql([]);
    });
    it("returns an array of all the values that do not pass a truth test", () => {
      expect(
        _.reject([1, 2, 3, 4], num => {
          return num % 2 === 0;
        })
      ).to.eql([1, 3]);
      expect(
        _.reject([1, "a", 3, "b"], elem => {
          return typeof elem === "number";
        })
      ).to.eql(["a", "b"]);
      expect(
        _.reject([1, "a", 3, "b"], elem => {
          return typeof elem === "string";
        })
      ).to.eql([1, 3]);
    });
    it("expects callback to be called on each element of passed array", () => {
      const spy = sinon.spy();
      _.filter(["A", "B", "C"], spy);
      expect(spy.callCount).to.equal(3);
    });
  });

  describe("#uniq", () => {
    it("returns an empty array for invalid arguments", () => {
      expect(_.uniq({})).to.eql([]);
      expect(_.uniq(4)).to.eql([]);
      expect(_.uniq(4141)).to.eql([]);
    });
    it("returns a unique array with only 1st occurance of each value", () => {
      expect(_.uniq([1, 2, 2, 3, 3, 1, 4])).to.eql([1, 2, 3, 4]);
      expect(_.uniq([1, 2, "2", 3, 3, "2", 1, 4])).to.eql([1, 2, "2", 3, 4]);
      expect(_.uniq([1, 2, [2, 3], 3, 1, 4])).to.eql([1, 2, [2, 3], 3, 4]);
    });
    it("returns unique characters in a string in an array", () => {
      expect(_.uniq("test")).to.eql(["t", "e", "s"]);
      expect(_.uniq("Hello World")).to.eql([
        "H",
        "e",
        "l",
        "o",
        " ",
        "W",
        "r",
        "d"
      ]);
    });
  });

  describe("#map", () => {
    it("return an empty array if the argument is not an array", () => {
      expect(_.map(5)).to.eql([]);
      expect(_.map(true)).to.eql([]);
    });
    it("applies the function to the array", () => {
      expect(
        _.map([1, 2, 3], num => {
          return num * 3;
        })
      ).to.eql([3, 6, 9]);
    });
    it("applies the function to the string", () => {
      expect(
        _.map("123", num => {
          return num * 3;
        })
      ).to.eql([3, 6, 9]);
    });
    it("applies the function to the object", () => {
      expect(
        _.map({ one: 1, two: 2, three: 3 }, num => {
          return num * 3;
        })
      ).to.eql([3, 6, 9]);
    });
  });

  describe("#contains", () => {
    it("returns false for invalid inputs", () => {
      expect(_.contains(true, true)).to.equal(false);
      expect(_.contains(1234567, 2)).to.equal(false);
    });
    it("returns false when the value is not present in the input", () => {
      expect(_.contains([1, 2, 3], 4)).to.equal(false);
      expect(_.contains("hello world", "b")).to.equal(false);
      expect(_.contains({ one: 1, two: 2, three: 3 }, 4)).to.equal(false);
    });
    it("returns true when the value is present in the array or a string", () => {
      expect(_.contains([1, 2, 3], 2)).to.equal(true);
      expect(_.contains([1, 2, 3], 3)).to.equal(true);
      expect(_.contains("hello world", "o")).to.equal(true);
      expect(_.contains("hello world", "d")).to.equal(true);
    });
    it("returns true when the value is present in an object", () => {
      expect(_.contains({ one: 1, two: 2, three: 3 }, 2)).to.equal(true);
      expect(_.contains({ name: "moe", age: 40 }, "moe")).to.equal(true);
      expect(_.contains({ one: 1, two: 2, three: 3 }, 3)).to.equal(true);
    });
  });

  describe("#pluck", () => {
    it("should return an empty array for invalid arguments", () => {
      expect(_.pluck("str")).to.eql([]);
      expect(_.pluck(5)).to.eql([]);
      expect(_.pluck(undefined)).to.eql([]);
    });
    it("returns an array of property values", () => {
      expect(_.pluck([{ name: "moe", age: 40 }], "age")).to.eql([40]);
      expect(_.pluck([{ name: "moe", age: 40 }], "name")).to.eql(["moe"]);
      expect(
        _.pluck(
          [
            { name: "moe", age: 40 },
            { name: "mia", age: 35 },
            { name: "jack", age: 25 }
          ],
          "name"
        )
      ).to.eql(["moe", "mia", "jack"]);
    });
  });

  describe("#reduce", () => {
    it("returns the sum of all the items in the list", () => {
      expect(
        _.reduce(
          [1, 2, 3, 4],
          (acc, num) => {
            return acc + num;
          },
          0
        )
      ).to.eql(10);
    });
  });

  describe("#once", () => {
    it("the returned function can only be called once", () => {
      const spy = sinon.spy();
      const spyOnce = _.once(spy);
      spyOnce();
      spyOnce();
      spyOnce();
      spyOnce();
      expect(spy.callCount).to.equal(1);
    });
    it("handles invalid inputs", () => {
      expect(_.once()).to.equal(undefined);
      expect(_.once(false)).to.equal(false);
      expect(_.once([1])).to.eql([1]);
    });
  });

  describe("#shuffle", () => {
    it("should return a shuffled copy of the array", () => {
      const actual = _.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      expect(actual).to.be.an("array");
      expect(actual).to.not.eql(expected);
    });
    it("shuffles a string chars into an array", () => {
      const actual = _.shuffle("Hello World");
      const expected = ["H", "e", "l", "l", "o", " ", "W", "o", "r", "l", "d"];
      expect(actual).to.not.eql(expected);
    });
    it("should return a shuffled copy of the object", () => {
      const actual = _.shuffle({
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9,
        ten: 10
      });
      const expected = {
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9,
        ten: 10
      };
      expect(actual).to.be.an("array");
      expect(actual).to.not.eql(expected);
    });

    it("handles invalid inputs", () => {
      expect(_.shuffle()).to.eql([]);
      expect(_.shuffle(false)).to.eql([]);
      expect(_.shuffle([1])).to.eql([1]);
    });
  });

  describe("#invoke", () => {
    it("should call sort method on each element in an array and return results in an array", () => {
      let result = _.invoke([[5, 1, 7], [3, 2, 1]], "sort");
      expect(result).to.eql([[1, 5, 7], [1, 2, 3]]);
    });
    it("should call sort method on each value in an object and return results in an array", () => {
      let result = _.invoke({ a: [5, 1, 7], b: [3, 2, 66] }, "sort");
      expect(result).to.eql([[1, 5, 7], [2, 3, 66]]);
    });
    it("should pass extra arguments onto method invocation", () => {
      let result = _.invoke(["lol"], "concat", "bbq");
      expect(result).to.eql(["lolbbq"]);
    });
    it("takes a function name as an argument and applies it to each value an array", () => {
      let result = _.invoke([[5, 1, 7], [3, 2, 1]], "slice", 1);
      expect(result).to.be.eql([[1, 7], [2, 1]]);
    });
  });

  describe("#_.sortBy", () => {
    it("runs each list value through iteratee", () => {
      function Sin(n) {
        return Math.sin(n);
      }
      const list = [1, 2, 3, 4, 5, 6];
      const actual = _.sortBy(list, Sin);
      const expected = [5, 4, 6, 3, 1, 2];
      expect(actual).to.eql(expected);
    });
    it("runs each object in list through iteratee", () => {
      const stooges = [
        { name: "moe", age: 40 },
        { name: "larry", age: 50 },
        { name: "curly", age: 60 }
      ];
      const actual = _.sortBy(stooges, "name");
      const expected = [
        { name: "curly", age: 60 },
        { name: "larry", age: 50 },
        { name: "moe", age: 40 }
      ];
      expect(actual).to.eql(expected);
    });
  });

  describe("#zip ", () => {
    it("merges arrays together at their corresponding indexes", () => {
      const actual = _.zip(
        ["Jim", "John", "Jimmy"],
        [60, 70, 80],
        [true, false, true]
      );
      const expected = [
        ["Jim", 60, true],
        ["John", 70, false],
        ["Jimmy", 80, true]
      ];
      expect(actual).to.eql(expected);
    });

    it("handles invalid inputs", () => {
      expect(_.zip()).to.eql([]);
      expect(_.zip(false)).to.eql([]);
      expect(_.zip(123421)).to.eql([]);
    });
  });

  describe("_.sortedIndex", () => {
    it("finds the index where the value should be inserted into an array to maintain order", () => {
      expect(_.sortedIndex([1, 2, 4, 5, 6, 7], 3)).to.equal(2);
      expect(_.sortedIndex([3, 4, 5], 1)).to.equal(0);
      expect(_.sortedIndex([1, 2, 4, 5, 6, 7], 8)).to.equal(6);
    });

    it("works for objects when the iteratee is the name of the property to search for", () => {
      expect(
        _.sortedIndex([{ a: 1 }, { a: 2 }, { a: 4 }], { a: 3 }, "a")
      ).to.equal(2);
    });
  });

  describe("flatten", () => {
    it("can flatten nested arrays", () => {
      const nestedArray = [1, [2], [3, [[[4]]]]];
      expect(_.flatten(nestedArray)).to.eql([1, 2, 3, 4]);
    });
  });

  describe("intersection", () => {
    it("should take the set intersection of two arrays", () => {
      const stooges = ["moe", "curly", "larry"];
      const leaders = ["moe", "groucho"];
      expect(_.intersection(stooges, leaders)).to.eql(["moe"]);
    });

    it("works for multiple arrays", () => {
      const stooges = ["moe", "curly", "larry"];
      const leaders = ["moe", "groucho"];
      expect(_.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1])).to.eql([1, 2]);
    });
  });

  describe("difference", () => {
    it("returns values that are not present in other arrays", () => {
      const result = _.difference([1, 2, 3, 4, 5], [5, 2, 10]);
      const expected = [1, 3, 4];
      expect(result).to.eql(expected);
    });

    it("returns values in array that are not present inside other arrays, when there are multiple other arrays", () => {
      const result = _.difference(
        [1, 2, 3, 4, 5],
        [[13, 14, 1], [11, 12, 3], [11, 15, 5]]
      );
      const expected = [2, 4];
      expect(result).to.eql(expected);
    });
  });

  describe("#memoize", () => {
    it("should properly return a previously cached result", () => {
      const func = n => {
        return n * 2;
      };
      const memFunc = _.memoize(func);
      memFunc(2);
      const result = memFunc(2);
      const expected = 4;
      expect(result).to.equal(expected);
    });

    it("should properly return when there is no matching key stored in the cache", () => {
      const func = n => {
        return n * 2;
      };
      const memFunc = _.memoize(func);
      const result = memFunc(4);
      const expected = 8;
      1;
      expect(result).to.equal(expected);
    });
  });

  describe("#negate", () => {
    it("returns the function itself if not passed a function as an argument", () => {
      expect(_.negate()).to.be.a("function");
    });
    it("negates the result of a function passed to it", () => {
      let isFalsy = _.negate(Boolean);
      expect(isFalsy(false)).to.be.true;
      expect(isFalsy(true)).to.be.false;
      let isOdd = _.negate(isFalsy);
      expect(isOdd(1)).to.be.true;
    });
  });

  describe("#values", () => {
    it("returns an empty array when not given an array or valid object", () => {
      expect(_.values()).to.eql([]);
      expect(_.values("hello")).to.eql([]);
      expect(_.values(null)).to.eql([]);
      expect(_.values(5)).to.eql([]);
      expect(_.values({})).to.eql([]);
    });
    it("returns the same array when given an array", () => {
      expect(_.values(["hello"])).to.eql(["hello"]);
      expect(_.values([1, 2, 3])).to.eql([1, 2, 3]);
    });
    it("returns an array of values when given an object", () => {
      expect(_.values({ 0: 0, 1: 1 })).to.eql([0, 1]);
      expect(_.values({ one: 1, two: 2, three: 3 })).to.eql([1, 2, 3]);
    });
  });

  describe("#every", () => {
    it("it is a function", () => {
      expect(_.every).to.be.a("function");
    });
    it("returns true if not given a valid list", () => {
      expect(_.every()).to.equal(true);
      expect(_.every(5)).to.equal(true);
      expect(_.every("hello")).to.equal(true);
      expect(_.every(["hello"])).to.equal(true);
      expect(_.every({ 0: "hello" })).to.equal(true);
    });
    it("returns false if an item in an array does not pass the predicate", () => {
      const isEven = num => {
        return num % 2 == 0;
      };
      expect(_.every([0, 2, 4, 6, 1, 2, 4, 6], isEven)).to.equal(false);
      expect(_.every([true, 1, null, "yes"], Boolean)).to.equal(false);
    });
    it("returns true if all items in an array pass the predicate", () => {
      const isEven = num => {
        return num % 2 === 0;
      };
      expect(_.every([0, 2, 4, 6], isEven)).to.equal(true);
    });
  });

  describe("some", () => {
    it("returns false if not given a valid list", () => {
      expect(_.some()).to.equal(false);
      expect(_.some(5)).to.equal(false);
      expect(_.some("hello")).to.equal(false);
      expect(_.some(["hello"])).to.equal(false);
      expect(_.some({ 0: "hello" })).to.equal(false);
    });
    it("returns true if any item in an array passes the predicate", () => {
      const isEven = num => {
        return num % 2 == 0;
      };
      expect(_.some([0, 2, 4, 6, 1, 2, 4, 6], isEven)).to.equal(true);
      expect(_.some([true, 1, null, "yes"], Boolean)).to.equal(true);
    });
    function isEven(x) {
      return x % 2 === 0;
    }

    it("returns true if any item passes predicate test", () => {
      expect(
        _.some({ one: 1, two: 2, three: 3, four: 4, five: 5 }, isEven)
      ).to.equal(true);
      expect(
        _.some({ one: 1, three: 3, five: 5, seven: 7, nine: 9 }, isEven)
      ).to.equal(false);
    });
  });

  describe("partial", () => {
    it("applies a function partially by filling in its arguments", () => {
      const subtract = (a, b) => b - a;
      const sub5 = _.partial(subtract, 5);
      const actual = sub5(20);
      const expected = 15;
      expect(actual).to.eql(expected);
    });
    it("_ can be used as a placeholder without changing the context", () => {
      const subtract = (a, b) => b - a;
      const subFrom20 = _.partial(subtract, _, 20);
      const actual = subFrom20(5);
      const expected = 15;
      expect(actual).to.eql(expected);
    });
  });

  describe("delay", () => {
    let clock;
    before(() => {
      clock = sinon.useFakeTimers();
    });
    after(() => {
      clock.restore();
    });
    it("invokes function after waiting specified time", () => {
      const spy = sinon.spy(console.log);
      _.delay(spy, 1000);
      clock.tick(998);
      expect(spy.callCount).to.equal(0);
      clock.tick(1);
      expect(spy.calledOnce).to.be.false;
      clock.tick(1);
      expect(spy.calledOnce).to.be.true;
    });
    it("invokes function with one given argument after waiting", () => {
      const spy = sinon.spy(console.log);
      _.delay(spy, 1000, "logged after waiting");
      clock.tick(999);
      expect(spy.callCount).to.equal(0);
      clock.tick(1);
      expect(spy.calledOnce).to.be.true;
      expect(spy.calledWithExactly("logged after waiting")).to.be.true;
    });
    it("invokes function with multiple given arguments after waiting", () => {
      const spy = sinon.spy(console.log);
      _.delay(spy, 1000, "logged", "after", "waiting");
      clock.tick(999);
      expect(spy.callCount).to.equal(0);
      clock.tick(1);
      expect(spy.calledOnce).to.be.true;
      expect(spy.calledWithExactly("logged", "after", "waiting")).to.be.true;
    });
  });

  describe("_.where", () => {
    it("returns an array of all values that contain given properties", () => {
      const listOfPlays = [
        { title: "Cymbeline", author: "Shakespeare", year: 1611 },
        { title: "Othello", author: "Shakespeare", year: 1622 },
        { title: "The Tempest", author: "Shakespeare", year: 1611 }
      ];
      const properties = { author: "Shakespeare", year: 1611 };
      const actual = _.where(listOfPlays, properties);
      const expected = [
        { title: "Cymbeline", author: "Shakespeare", year: 1611 },
        { title: "The Tempest", author: "Shakespeare", year: 1611 }
      ];
      expect(actual).to.eql(expected);
    });
  });

  describe("#_.extend", () => {
    it("returns a combined object", () => {
      const obj1 = { name: "moe" };
      const obj2 = { age: 50 };
      expect(_.extend(obj1, obj2)).to.eql({ name: "moe", age: 50 });
    });
    it("replaces value if key is in both destination and source object", () => {
      const obj1 = { name: "moe" };
      const obj2 = { name: "zoe", age: 50 };
      expect(_.extend(obj1, obj2)).to.eql({ name: "zoe", age: 50 });
    });
    it("copies nested arrays and objects by reference", () => {
      const obj1 = { 1: 1, 2: 2, 3: 3 };
      const obj2 = { 4: 4, 5: 5, nums: [6, 7, 8] };
      const obj3 = { 4: 4, 5: 5, nums: { 6: 6, 7: 7, 8: 8 } };
      expect(_.extend(obj1, obj2).nums).to.eql([6, 7, 8]);
      expect(_.extend(obj1, obj3).nums).to.eql({ 6: 6, 7: 7, 8: 8 });
    });
  });

  describe("#_.default", () => {
    it("returns object with values added if not defined", () => {
      const obj1 = { flavor: "chocolate" };
      const obj2 = { flavor: "vanilla", sprinkles: "lots" };
      expect(_.defaults(obj1, obj2)).to.eql({
        flavor: "chocolate",
        sprinkles: "lots"
      });
    });
  });

  describe("#throttle", () => {
    it("it is a function", () => {
      expect(_.throttle).to.be.a("function");
    });
  });
});
