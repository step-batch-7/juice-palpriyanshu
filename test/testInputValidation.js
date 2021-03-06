const assert = require("assert");
const {
  isValidOptionAndValue,
  isValidSaveParameters,
  isValidQueryParameters,
  isValidInput
} = require("../src/inputValidation.js");

describe("isValidOptionAndValue", function() {
  it("should validate positive integer for correct option of empId", function() {
    let transactionFields = {
      "--beverage": "orange",
      "--empId": "88",
      "--qty": "1"
    };
    assert.ok(isValidOptionAndValue(transactionFields, "--empId"));
  });

  it("should validate positive integer when correct option of qty is present", function() {
    let transactionFields = {
      "--beverage": "orange",
      "--empId": "88",
      "--qty": "1"
    };
    assert.ok(isValidOptionAndValue(transactionFields, "--qty"));
  });

  it("should invalidate when option is wrong but value is correct", function() {
    let transactionFields = { "--beverage": "orange", emp: "88", "--qty": "1" };
    assert.ok(!isValidOptionAndValue(transactionFields, "--empId"));
  });

  it("should invalidate when both option and value are wrong", function() {
    let transactionFields = {
      "--beverage": "brinjal",
      "--empId": "88",
      qty: "1.1"
    };
    assert.ok(!isValidOptionAndValue(transactionFields, "--qty"));
  });
});

describe("isValidSaveParameters", function() {
  it("should validate when all option and length of parameters is correct", function() {
    let parsedParameters = {
      "--beverage": "Orange",
      "--empId": "88",
      "--qty": "1"
    };
    assert.ok(isValidSaveParameters(parsedParameters, 6));
  });

  it("should invalidate when '--qty' is incorrect", function() {
    let parsedParameters = {
      "--beverage": "apple",
      "--empId": "88",
      "--qty": "-1"
    };
    assert.ok(!isValidSaveParameters(parsedParameters, 6));
  });

  it("should invalidate when '--empId' is incorrect", function() {
    let parsedParameters = {
      "--beverage": "Orange",
      "--empId": "-88",
      "--qty": "1"
    };
    assert.ok(!isValidSaveParameters(parsedParameters, 6));
  });

  it("should invalidate when parameters length are is not equal to 6", function() {
    let parsedParameters = { "--beverage": "orange", "--empId": "88" };
    assert.ok(!isValidSaveParameters(parsedParameters, 4));
  });
});

describe("isValidQueryParameters", function() {
  it("should validate when empId and length of parameters is correct", function() {
    let parsedParameters = { "--empId": "88" };
    assert.ok(isValidQueryParameters(parsedParameters, 2));
  });

  it("should invalidate when '--empId' value is incorrect", function() {
    let parsedParameters = { "--empId": "8.8" };
    assert.ok(!isValidQueryParameters(parsedParameters, 2));
  });

  it("should invalidate when '--empId' option is incorrect", function() {
    let parsedParameters = { "-empId": "-88" };
    assert.ok(!isValidQueryParameters(parsedParameters, 2));
  });

  it("should validate when parameters length are equal to 4", function() {
    let parsedParameters = { "--empId": "2", "--date": "2-1-1999" };
    assert.ok(isValidQueryParameters(parsedParameters, 4));
  });

  it("should validate when parameters length are equal to 6", function() {
    let parsedParameters = {
      "--empId": "2",
      "--date": "2-1-1999",
      "--beverage": "orange"
    };
    assert.ok(isValidQueryParameters(parsedParameters, 6));
  });
});

describe("isValidInput", function() {
  it("should validate for save parameters when save option is present", function() {
    let operation = "--save";
    let parsedParameters = {
      "--beverage": "Apple",
      "--empId": "3",
      "--qty": "1"
    };
    assert.ok(isValidInput(operation, parsedParameters, 6));
  });

  it("should validate for query parameters when query option is present", function() {
    let operation = "--query";
    let parsedParameters = { "--empId": "3" };
    assert.ok(isValidInput(operation, parsedParameters, 2));
  });

  it("should invalidate when neither save nor query option is present", function() {
    let operation = "xyz";
    let parsedParameters = { "--empId": "3" };
    assert.ok(!isValidInput(operation, parsedParameters, 2));
  });
});
