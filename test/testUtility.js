const utility = require("../src/utility.js");
const assert = require("assert");

const getError = utility.getError;
const isIncludeOption = utility.isIncludeOption;
const isPositiveInt = utility.isPositiveInt;
const parseParameters = utility.parseParameters;

describe("getError", function() {
  it("should print error message", function() {
    assert.strictEqual(getError(), "wrong Input");
  });
});

describe("isIncludeOption", function() {
  it("should validate when option is include in options", function() {
    let options = { "--beverage": "orange", "--empid": "1" };
    assert.ok(isIncludeOption(options, "--empid"));
  });

  it("should invalidate when option is not include in options", function() {
    let options = { "--beverage": "orange", "--empid": "1" };
    assert.ok(!isIncludeOption(options, "--qty"));
  });
});

describe("isPositiveInt", function() {
  it("should validate for integer greater than 0", function() {
    assert.ok(isPositiveInt("7"));
  });

  it("should invalidate for integer less than 0", function() {
    assert.ok(!isPositiveInt("-7"));
  });

  it("should invalidate when no. is not integer", function() {
    assert.ok(!isPositiveInt("7.5"));
  });

  it("should invalidate for value other than num", function() {
    assert.ok(!isPositiveInt("a"));
  });
});

describe("parseParameters", function() {
  it("should give transactionFields for even num of parameters", function() {
    let parameters = ["beverage", "orange", "empid", "5", "qty", "4"];
    let expected = { beverage: "orange", empid: "5", qty: "4" };
    assert.deepStrictEqual(parseParameters(parameters), expected);
  });

  it("should give transactionFields for odd num of parameters", function() {
    let parameters = ["beverage", "orange", "empid", "5", "qty"];
    let expected = { beverage: "orange", empid: "5", qty: undefined };
    assert.deepStrictEqual(parseParameters(parameters), expected);
  });
});
