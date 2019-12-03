const assert = require("chai").assert;
const {
  performOperation,
  performQueryOperation,
  performSaveOperation
} = require("../src/transactionRecord.js");

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
    assert.deepStrictEqual(
      actual,
      `Employee ID, Beverage, Quantity, Date\nTotal: 0 Juice`
    );
  });

  it("should give the msg for query transactions when file is exist", function() {
    let parsedParameters = { empId: 2, date: "2-3-2000" };
    let dateAndTime = new Date();
    let fileSysc = {
      path: "path",
      reader: function(path) {
        assert.strictEqual(path, "path");
        return '[{"empId": "2","beverages":"Apple","qty":2,"date":"2-3-2000"}]';
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
    let expected = `Employee ID, Beverage, Quantity, Date\n2,Apple,2,2-3-2000\nTotal: 2 Juices`;
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
    let expected = `Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date\n2,apple,7,${date.toJSON()}`;
    assert.strictEqual(actual, expected);
  });
});

describe("performOperation", function() {
  it("should perform save operation when save option is present", function() {
    let inputValidity = true;
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
      fileSys,
      inputValidity
    );
    let expected = `Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date\n4,apple,2,${dateAndTime.toJSON()}`;
    assert.strictEqual(actual, expected);
  });

  it("should perform query operation when query option is present", function() {
    let inputValidity = true;
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
      fileSys,
      inputValidity
    );
    let expected = `Employee ID, Beverage, Quantity, Date\nTotal: 0 Juice`;
    assert.strictEqual(actual, expected);
  });

  it("should give error msg when input is invalid", function() {
    let inputValidity = false;
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
      fileSys,
      inputValidity
    );
    assert.strictEqual(actual, "wrong Input");
  });
});
