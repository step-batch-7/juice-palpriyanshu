const read = require("../src/readTransactions.js");
const assert = require("assert");

const fetchTransactions = read.fetchTransactions;
const extractTransactions = read.extractTransactions;

describe("fetchTransactions", function() {
  it("should fetch the transactions from file when file is exist", function() {
    let path = "path";
    let fileSysc = {
      reader: function(path) {
        assert.strictEqual(path, "path");
        return "[]";
      },
      exist: function(path) {
        assert.ok(path, "path");
        return true;
      }
    };
    assert.deepStrictEqual(fetchTransactions(path, fileSysc), []);
  });
});

describe("extractTransactions", function() {
  it("should extract the transactions on the basis of empid", function() {
    let fetchedTransactions = [
      { empid: 1, date: "2 / 3 / 2000" },
      { empid: 2, date: "2 / 3 / 2000" },
      { empid: 1, date: "1 / 4 / 1999" }
    ];
    let empid = 1;
    let creteria = empid;
    assert.deepStrictEqual(extractTransactions(fetchedTransactions, creteria), [
      { empid: 1, date: "2 / 3 / 2000" },
      { empid: 1, date: "1 / 4 / 1999" }
    ]);
  });
});
