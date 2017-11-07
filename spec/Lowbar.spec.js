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
    it("is a function", () => {
      expect(_.identity).to.be.a("function");
    });
    it("returns the same output as the argument", () => {
      expect(_.identity("hello")).to.equal("hello");
      expect(_.identity(123)).to.equal(123);
      expect(_.identity([1, 2, "3", 4, 5])).to.eql([1, 2, "3", 4, 5]);
      expect(_.identity(true)).to.eql(true);
      expect(_.identity({ name: "Tom" })).to.eql({ name: "Tom" });
    });
  });

  describe("#first", () => {
    it("is a function", () => {
      expect(_.first).to.be.a("function");
    });
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
    it("is a function", () => {
      expect(_.last).to.be.a("function");
    });
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
    it("is a function", () => {
      expect(_.each).to.be.a("function");
    });
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
});
