const assert = require("chai").assert;
const record = require("../src/transactionRecord.js");

const performOperation = record.performOperation;
const performQueryOperation = record.performQueryOperation;
const performSaveOperation = record.performSaveOperation;

describe("performQueryOperation", function() {
  it("should give the msg for query transactions when file is not exist", function() {
    let parsedParameters = { empId: "2", date: "2-3-2000" };
    let dateAndTime = new Date();
    let fileSysc = {
      path: "path",
      reader: function(path) {
        assert.strictEqual(path, "path");
        return '[{"empId": "2","date":"2-3-2000"}]';
      },
      exist: function(path) {
        assert.ok(path, "path");
        return false;
      }
    };
    let actual = performQueryOperation(parsedParameters, dateAndTime, fileSysc);
    assert.deepStrictEqual(actual, "record not found");
  });

  it("should give the msg for query transactions when file is exist", function() {
    let parsedParameters = { empId: 2, date: "2-3-2000" };
    let dateAndTime = new Date();
    let fileSysc = {
      path: "path",
      reader: function(path) {
        assert.strictEqual(path, "path");
        return '[{"empId": "2","beverages":"apple","qty":2,"date":"2-3-2000"}]';
      },
      exist: function(path) {
        assert.ok(path, "path");
        return true;
      }
    };
    let extractedTransactions = [
      { empId: 2, qty: 1 },
      { empId: 2, qty: 1 }
    ];
    let actual = performQueryOperation(parsedParameters, dateAndTime, fileSysc);
    let expected = `Employee Id, Beverage, Quantity, Date\n2,apple,2,2-3-2000\ntotal : 2 juice`;
    assert.deepStrictEqual(actual, expected);
  });
});

describe("performSaveOperation", function() {
  it("should save the transactions when save option is present", function() {
    let parsedParameters = { "--empId": 2, "--beverage": "apple", "--qty": 7 };
    let fileSys = {
      path: "path",
      writer: function(path, data) {
        assert.strictEqual(path, "path");
        return;
      },
      reader: function(path) {
        assert.strictEqual(path, "path");
        return "[]";
      },
      exist: function(path) {
        return true;
      }
    };
    let date = new Date();
    let actual = performSaveOperation(parsedParameters, date, fileSys);
    let expected = `Transaction Recorded:\nEmployee Id,Beverage,Quantity,Date\n2, apple, 7, ${date.toJSON()}`;
    assert.strictEqual(actual, expected);
  });
});

describe("performOperation", function() {
  it("should perform save operation when save option is present", function() {
    let operation = "--save";
    let parsedParameters = { "--empId": 4, "--beverage": "apple", "--qty": 2 };
    let dateAndTime = new Date();
    let fileSys = {
      path: "path",
      encoder: "utf8",

      reader: function(path) {
        assert.strictEqual(path, "path");
      },
      writer: function(path, data) {
        assert.strictEqual(path, "path");
      },
      exist: function(path) {
        assert.strictEqual(path, "path");
      }
    };
    let actual = performOperation(
      operation,
      parsedParameters,
      dateAndTime,
      fileSys
    );
    let expected = `Transaction Recorded:\nEmployee Id,Beverage,Quantity,Date\n4, apple, 2, ${dateAndTime.toJSON()}`;
    assert.strictEqual(actual, expected);
  });

  it("should perform query operation when query option is present", function() {
    let operation = "--query";
    let parsedParameters = { "--empId": 4, "--beverage": "apple" };
    let dateAndTime = new Date();
    let fileSys = {
      path: "path",
      encoder: "utf8",

      reader: function(path) {
        assert.strictEqual(path, "path");
        return "[]";
      },
      writer: function(path, data) {
        assert.strictEqual(path, "path");
        return;
      },
      exist: function(path) {
        assert.strictEqual(path, "path");
        return true;
      }
    };
    let actual = performOperation(
      operation,
      parsedParameters,
      dateAndTime,
      fileSys
    );
    let expected = `Employee Id, Beverage, Quantity, Date\ntotal : 0 juice`;
    assert.strictEqual(actual, expected);
  });
});
