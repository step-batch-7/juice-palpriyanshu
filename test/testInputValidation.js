const assert = require("assert");
const validity = require("../src/inputValidation.js");

const isValidBeverage = validity.isValidBeverage;
const isValidOptionAndValue = validity.isValidOptionAndValue;
const isValidSaveParameters = validity.isValidSaveParameters;
const isValidQueryParameters = validity.isValidQueryParameters;
const isValidInput = validity.isValidInput;

describe("isValidBeverage", function() {
  it("should validate when correct option and value is present", function() {
    let transactionFields = { "--beverage": "orange", empid: "88", qty: "1" };
    assert.strictEqual(isValidBeverage(transactionFields), true);
  });

  it("should invalidate when option is correct but value is wrong", function() {
    let transactionFields = { "--beverage": "brinjal", empid: "88", qty: "1" };
    assert.strictEqual(isValidBeverage(transactionFields), false);
  });

  it("should invalidate when option is wrong but value is correct", function() {
    let transactionFields = { beverage: "orange", empid: "88", qty: "1" };
    assert.strictEqual(isValidBeverage(transactionFields), false);
  });

  it("should invalidate when both option and value are wrong", function() {
    let transactionFields = { beverage: "brinjal", empid: "88", qty: "1" };
    assert.strictEqual(isValidBeverage(transactionFields), false);
  });
});

describe("isValidOptionAndValue", function() {
  it("should validate positive integer for correct option of empid", function() {
    let transactionFields = {
      "--beverage": "orange",
      "--empid": "88",
      "--qty": "1"
    };
    assert.ok(isValidOptionAndValue(transactionFields, "--empid"));
  });

  it("should validate positive integer when correct option of qty is present", function() {
    let transactionFields = {
      "--beverage": "orange",
      "--empid": "88",
      "--qty": "1"
    };
    assert.ok(isValidOptionAndValue(transactionFields, "--qty"));
  });

  it("should invalidate when option is wrong but value is correct", function() {
    let transactionFields = { "--beverage": "orange", emp: "88", "--qty": "1" };
    assert.ok(!isValidOptionAndValue(transactionFields, "--empid"));
  });

  it("should invalidate when both option and value are wrong", function() {
    let transactionFields = {
      "--beverage": "brinjal",
      "--empid": "88",
      qty: "1.1"
    };
    assert.ok(!isValidOptionAndValue(transactionFields, "--qty"));
  });
});

describe("isValidSaveParameters", function() {
  it("should validate when all option and length of parameters is correct", function() {
    let parsedParameters = {
      "--beverage": "orange",
      "--empid": "88",
      "--qty": "1"
    };
    assert.ok(isValidSaveParameters(parsedParameters, 6));
  });

  it("should invalidate when '--beverage' is incorrect", function() {
    let parsedParameters = {
      "--beverage": "brinjal",
      "--empid": "88",
      "--qty": "1"
    };
    assert.ok(!isValidSaveParameters(parsedParameters, 6));
  });

  it("should invalidate when '--empid' is incorrect", function() {
    let parsedParameters = {
      "--beverage": "orange",
      "--empid": "-88",
      "--qty": "1"
    };
    assert.ok(!isValidSaveParameters(parsedParameters, 6));
  });

  it("should invalidate when parameters length are is not equal to 6", function() {
    let parsedParameters = { "--beverage": "orange", "--empid": "88" };
    assert.ok(!isValidSaveParameters(parsedParameters, 4));
  });
});

describe("isValidQueryParameters", function() {
  it("should validate when empid and length of parameters is correct", function() {
    let parsedParameters = { "--empid": "88" };
    assert.ok(isValidQueryParameters(parsedParameters, 2));
  });

  it("should invalidate when '--empid' value is incorrect", function() {
    let parsedParameters = { "--empid": "8.8" };
    assert.ok(!isValidQueryParameters(parsedParameters, 2));
  });

  it("should invalidate when '--empid' option is incorrect", function() {
    let parsedParameters = { "-empid": "-88" };
    assert.ok(!isValidQueryParameters(parsedParameters, 2));
  });

  it("should invalidate when parameters length are is not equal to 2", function() {
    let parsedParameters = { "--empid": "2", "--qty": "2" };
    assert.ok(!isValidQueryParameters(parsedParameters, 4));
  });
});

describe("isValidInput", function() {
  it("should validate for save parameters when save option is present", function() {
    let operation = "--save";
    let parsedParameters = {
      "--beverage": "apple",
      "--empid": "3",
      "--qty": "1"
    };
    assert.ok(isValidInput(operation, parsedParameters, 6));
  });

  it("should validate for query parameters when query option is present", function() {
    let operation = "--query";
    let parsedParameters = { "--empid": "3" };
    assert.ok(isValidInput(operation, parsedParameters, 2));
  });

  it("should invalidate when neither save nor query option is present", function() {
    let operation = "xyz";
    let parsedParameters = { "--empid": "3" };
    assert.ok(!isValidInput(operation, parsedParameters, 2));
  });
});
