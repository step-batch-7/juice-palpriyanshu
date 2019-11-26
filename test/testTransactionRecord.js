const record = require("../src/transactionRecord.js");
const assert = require("assert");

const parseOperationAndParameter = record.parseOperationAndParameter;
const getTransaction = record.getTransaction;
const getPreviousTransactions = record.getPreviousTransactions;
const getTransactionRecord = record.getTransactionRecord;

describe("getTransaction", function() {
  it("should give transactions when transaction field is given", function() {
    let transactionFields = {
      "--beverage": "orange",
      "--empid": "23",
      "--qty": "8"
    };
    let dateAndTime = new Date();
    let expected = {
      empid: "23",
      beverages: "orange",
      qty: "8",
      date: dateAndTime
    };
    assert.deepStrictEqual(
      getTransaction(transactionFields, dateAndTime),
      expected
    );
  });

  it("should give undefined when transaction field is empty", function() {
    let transactionFields = {};
    let dateAndTime = new Date();
    let expected = {
      empid: undefined,
      beverages: undefined,
      qty: undefined,
      date: dateAndTime
    };
    assert.deepStrictEqual(
      getTransaction(transactionFields, dateAndTime),
      expected
    );
  });

  it("should give first value when transaction field is repeated", function() {
    let transactionFields = {
      "--beverage": "orange",
      "--empid": "23",
      "--qty": "8",
      "--empid": "34"
    };
    let dateAndTime = new Date();
    let expected = {
      empid: "34",
      beverages: "orange",
      qty: "8",
      date: dateAndTime
    };
    assert.deepStrictEqual(
      getTransaction(transactionFields, dateAndTime),
      expected
    );
  });
});

describe("parseOperationAndParameter", function() {
  it("should give error msg when option is not present", function() {
    let arg = ["--beverage", "orange"];
    let path = "./testFile.json";
    let date = new Date();
    assert.strictEqual(
      parseOperationAndParameter(arg, path, date),
      "wrong Input"
    );
  });
});

describe("getPreviousTransactions", function() {
  it("should give empty object when file is not exist", function() {
    let path = "./testFile.json";
    assert.deepStrictEqual(getPreviousTransactions(path), {});
  });
  it("should give previous transaction when file is exist", function() {
    let path = "./testFile.json";
    assert.deepStrictEqual(getPreviousTransactions(path), {});
  });
});

describe("getTransactionRecord", function() {
  it("should append new transaction record when new employee id is registered", function() {
    let transactionFields = {
      "--beverage": "orange",
      "--empid": "34",
      "--qty": "6"
    };
    let path = "./testFile.json";
    let dateAndTime = new Date();
    let expected = {
      34: [
        {
          empid: "34",
          beverages: "orange",
          qty: "6",
          date: dateAndTime
        }
      ]
    };
    assert.deepStrictEqual(
      getTransactionRecord(transactionFields, dateAndTime, path),
      expected
    );
  });

  it("should add to previous transaction record when same employee id is registered", function() {
    let transactionFields = {
      "--beverage": "apple",
      "--empid": "34",
      "--qty": "1"
    };
    let path = "./testFile.json";
    let dateAndTime = new Date();
    let expected = {
      34: [
        {
          empid: "34",
          beverages: "apple",
          qty: "1",
          date: dateAndTime
        }
      ]
    };
    assert.deepStrictEqual(
      getTransactionRecord(transactionFields, dateAndTime, path),
      expected
    );
  });
});
