const read = require("../src/readTransactions.js");
const assert = require("assert");

const fetchTransactions = read.fetchTransactions;

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
