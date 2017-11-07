const expect = require("chai").expect;
const path = require("path");
const _ = require(path.join(__dirname, "..", "./Lowbar.js"));

describe("_", () => {
  "use strict";

  it("is an object", () => {
    expect(_).to.be.an("object");
  });

  describe("#identity", function() {
    it("is a function", function() {
      expect(_.identity).to.be.a("function");
    });
    it("returns the same output as the argument", function() {
      expect(_.identity("hello")).to.equal("hello");
      expect(_.identity(123)).to.equal(123);
      expect(_.identity([1, 2, "3", 4, 5])).to.eql([1, 2, "3", 4, 5]);
      expect(_.identity(true)).to.eql(true);
      expect(_.identity({ name: "Tom" })).to.eql({ name: "Tom" });
    });
  });

  describe.only("#first", function() {
    it("is a function", function() {
      expect(_.first).to.be.a("function");
    });
    it("returns undefined for invalid input", function() {
      expect(_.first()).to.eql(undefined);
    });
    it("returns the first index of the array", function() {
      expect(_.first([1, 2, 3])).to.eql(1);
      expect(_.first(["A", "B", "C"])).to.eql("A");
    });
    it("returns the first n elements of the array when a 2nd argument is given.", function() {
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
});
