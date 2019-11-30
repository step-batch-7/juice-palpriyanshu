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
      "--empId": "23",
      "--qty": "8"
    };
    let dateAndTime = new Date();
    let expected = {
      empId: 23,
      beverages: "orange",
      qty: 8,
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
      empId: +undefined,
      beverages: undefined,
      qty: +undefined,
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
      "--empId": "23",
      "--qty": "8",
      "--empId": "34"
    };
    let dateAndTime = new Date();
    let expected = {
      empId: 34,
      beverages: "orange",
      qty: 8,
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
      path: "path",
      reader: function(path, encoder) {
        assert.strictEqual(path, "path");
        return "[]";
      },
      exist: function(path) {
        assert.ok(path, "path");
        return false;
      }
    };
    assert.deepStrictEqual(getPreviousTransactions(fileSys), []);
  });

  it("should give previous transaction when file is exist", function() {
    let fileSys = {
      path: "path",
      reader: function(path) {
        assert.strictEqual(path, "path");
        return "[]";
      },
      exist: function(path) {
        assert.ok(path, "path");
        return true;
      }
    };
    assert.deepStrictEqual(getPreviousTransactions(fileSys), []);
  });
});

describe("updateTransactions", function() {
  it("should update the previous transactions", function() {
    let previousTransactions = [];
    let currentTransaction = {
      empId: 2,
      beverage: "orange",
      qty: 1,
      date: "2/2/2000"
    };
    let actual = updateTransactions(previousTransactions, currentTransaction);
    let expected = [{ empId: 2, beverage: "orange", qty: 1, date: "2/2/2000" }];
    assert.deepStrictEqual(actual, expected);
  });
});

describe("saveTransactions", function() {
  it("should save the transactions in the file", function() {
    let data = { empId: 6 };
    let path = "path";
    let functionWasCalled = 0;
    let fileSys = {
      path: "path",
      writer: function(path, data) {
        functionWasCalled++;
        assert.strictEqual(path, "path");
        assert.strictEqual(data, '{\n  "empId": 6\n}');
      }
    };
    assert.strictEqual(saveTransactions(data, fileSys), undefined);
    assert.strictEqual(functionWasCalled, 1);
  });
});

describe("generateSaveMessage", function() {
  it("should generate message after saving the transactions", function() {
    let dateAndTime = new Date();
    let currentTransaction = {
      empId: 23,
      beverages: "orange",
      qty: 8,
      date: dateAndTime
    };
    let actual = generateSaveMessage(currentTransaction);
    let expected = `Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date\n23,orange,8,${dateAndTime.toJSON()}`;
    assert.strictEqual(actual, expected);
  });
});
