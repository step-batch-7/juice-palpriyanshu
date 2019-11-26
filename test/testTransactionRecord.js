const record = require("../src/transactionRecord.js");
const assert = require("assert");
const fs = require("fs");

const parseOperationAndParameter = record.parseOperationAndParameter;
const getTransaction = record.getTransaction;
const getPreviousTransactions = record.getPreviousTransactions;
const getTransactionRecord = record.getTransactionRecord;
const saveRecord = record.saveRecord;

describe("getTransaction", function() {
  it("should give transactions when transaction field is given", function() {
    let transactionFields = {
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

  it("should give last value when transaction field is repeated", function() {
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
    let fileSys = {
      writer: function(path, data, encoder) {
        assert.strictEqual(path, "path");
        assert.strictEqual(data, "{}");
        assert.strictEqual(encoder, "encoder");
        return;
      },
      reader: function(path, encoder) {
        assert.strictEqual(path, "path");
        assert.strictEqual(encoder, "encoder");
        return "{}";
      },
      exist: function(path) {
        assert.ok(path, "path");
        return false;
      }
    };
    assert.deepStrictEqual(
      getPreviousTransactions("path", "encoder", fileSys),
      {}
    );
  });

  it("should give previous transaction when file is exist", function() {
    let fileSys = {
      writer: function(path, data, encoder) {
        assert.strictEqual(path, "path");
        assert.strictEqual(data, "{}");
        assert.strictEqual(encoder, "encoder");
        return;
      },
      reader: function(path, encoder) {
        assert.strictEqual(path, "path");
        assert.strictEqual(encoder, "encoder");
        return "{}";
      },
      exist: function(path) {
        assert.ok(path, "path");
        return true;
      }
    };
    assert.deepStrictEqual(
      getPreviousTransactions("path", "encoder", fileSys),
      {}
    );
  });
});

describe("getTransactionRecord", function() {
  it("should give transaction record when an employee id is registered", function() {
    let transactionFields = {
      "--beverage": "orange",
      "--empid": "34",
      "--qty": "6"
    };
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

    let fileSys = {
      writer: function(path, data, encoder) {
        assert.strictEqual(path, "path");
        assert.strictEqual(data, "{}");
        assert.strictEqual(encoder, "encoder");
        return;
      },
      reader: function(path, encoder) {
        assert.strictEqual(path, "path");
        assert.strictEqual(encoder, "encoder");
        return "{}";
      },
      exist: function(path) {
        assert.ok(path, "path");
        return false;
      }
    };
    assert.deepStrictEqual(
      getTransactionRecord(
        transactionFields,
        dateAndTime,
        "path",
        "encoder",
        fileSys
      ),
      expected
    );
  });
});

describe("saveRecord", function() {
  it("should save record when inputs are valid", function() {
    let parameters = ["--beverage", "orange", "--empid", "7812", "--qty", "1"];
    let dateAndTime = "dateAndTime";
    let path = "path";
    let encoder = "encoder";
    let expected = {
      "7812": [
        { empid: "7812", beverages: "orange", qty: "1", date: "dateAndTime" }
      ]
    };
    expected = JSON.stringify(expected, null, 2);
    let fileSys = {
      writer: function(path, data, encoder) {
        assert.strictEqual(path, "path");
        assert.strictEqual(encoder, "encoder");
        return;
      },
      reader: function(path, encoder) {
        assert.strictEqual(path, "path");
        assert.strictEqual(encoder, "encoder");
        return "{}";
      },
      exist: function(path) {
        assert.ok(path, "path");
        return false;
      }
    };
    let actual = saveRecord(parameters, dateAndTime, path, encoder, fileSys);

    assert.strictEqual(actual, expected);
  });

  it("should give error msg when input is invalid", function() {
    let parameters = ["--beverage", "orange", "empid", "7812"];
    let dateAndTime = new Date();
    let path = "path";
    let encoder = "encoder";
    let fileSys = {
      writer: function(path, data, encoder) {
        assert.strictEqual(path, "path");
        assert.strictEqual(data, "{}");
        assert.strictEqual(encoder, "encoder");
        return;
      },
      reader: function(path, encoder) {
        assert.strictEqual(path, "path");
        assert.strictEqual(encoder, "encoder");
        return "{}";
      },
      exist: function(path) {
        assert.ok(path, "path");
        return false;
      }
    };
    assert.strictEqual(
      saveRecord(parameters, dateAndTime, path, encoder, fileSys),
      "wrong Input"
    );
  });
});
