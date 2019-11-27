const assert = require("assert");
const fs = require("fs");
const saved = require("../src/saveTransactions.js");

const generateCurrentTransaction = saved.generateCurrentTransaction;
const getPreviousTransactions = saved.getPreviousTransactions;
const updateTransactions = saved.updateTransactions;
const saveTransactions = saved.saveTransactions;
const generateSaveMessage = saved.generateSaveMessage;

describe("generateCurrentTransaction", function() {
  it("should give transactions when transaction field is given", function() {
    let parsedParameters = {
      "--beverage": "orange",
      "--empid": "23",
      "--qty": "8"
    };
    let dateAndTime = "1-2-2020";
    let expected = {
      empid: "23",
      beverages: "orange",
      qty: "8",
      date: dateAndTime
    };
    assert.deepStrictEqual(
      generateCurrentTransaction(parsedParameters, dateAndTime),
      expected
    );
  });

  it("should give undefined when transaction field is empty", function() {
    let parsedParameters = {};
    let dateAndTime = new Date();
    let expected = {
      empid: undefined,
      beverages: undefined,
      qty: undefined,
      date: dateAndTime
    };
    assert.deepStrictEqual(
      generateCurrentTransaction(parsedParameters, dateAndTime),
      expected
    );
  });

  it("should give last value when transaction field is repeated", function() {
    let parsedParameters = {
      "--beverage": "orange",
      "--empid": "23",
      "--qty": "8",
      "--empid": "34"
    };
    let dateAndTime = "20/01/1999";
    let expected = {
      empid: "34",
      beverages: "orange",
      qty: "8",
      date: dateAndTime
    };
    assert.deepStrictEqual(
      generateCurrentTransaction(parsedParameters, dateAndTime),
      expected
    );
  });
});

describe("getPreviousTransactions", function() {
  it("should give empty object when file is not exist", function() {
    let fileSys = {
      reader: function(path, encoder) {
        assert.strictEqual(path, "path");
        return "[]";
      },
      exist: function(path) {
        assert.ok(path, "path");
        return false;
      }
    };
    assert.deepStrictEqual(getPreviousTransactions("path", fileSys), []);
  });

  it("should give previous transaction when file is exist", function() {
    let fileSys = {
      reader: function(path) {
        assert.strictEqual(path, "path");
        return "[]";
      },
      exist: function(path) {
        assert.ok(path, "path");
        return true;
      }
    };
    assert.deepStrictEqual(getPreviousTransactions("path", fileSys), []);
  });
});

describe("updateTransactions", function() {
  it("should update the previous transactions", function() {
    let previousTransactions = [];
    let currentTransaction = {
      empid: "2",
      beverage: "orange",
      qty: "1",
      date: "2/2/2000"
    };
    let actual = updateTransactions(previousTransactions, currentTransaction);
    let expected = [
      { empid: "2", beverage: "orange", qty: "1", date: "2/2/2000" }
    ];
    assert.deepStrictEqual(actual, expected);
  });
});

describe("saveTransactions", function() {
  it("should save the transactions in the file", function() {
    let data = { empid: "6" };
    let path = "path";
    let fileSys = {
      writer: function(path, data) {
        assert.strictEqual(path, "path");
        assert.strictEqual(data, '{\n  "empid": "6"\n}');
        return;
      }
    };
    assert.strictEqual(saveTransactions(data, path, fileSys), undefined);
  });
});

describe("generateSaveMessage", function() {
  it("should generate message after saving the transactions", function() {
    let actual = generateSaveMessage("message");
    let expected =
      "Transaction Recorded: " +
      "\n" +
      "Employee ID,Beverage,Quantity,Date" +
      "\n" +
      "m,e,s,s,a,g,e";
    assert.strictEqual(actual, expected);
  });
});
