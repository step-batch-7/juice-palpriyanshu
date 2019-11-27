const assert = require("assert");
const performOperation = require("../src/transactionRecord.js")
  .performOperation;

describe("performOperation", function() {
  it("should perform the save operation when save option is present", function() {
    let operation = "--save";
    let parsedParameters = {
      "--beverage": "orange",
      "--empid": "2",
      "--qty": "1"
    };
    let dateAndTime = "23/2/2000";
    let path = "path";
    let fileSysc = {
      reader: function(path) {
        assert.strictEqual(path, "path");
        return "[]";
      },
      writer: function(path, data) {
        assert.strictEqual(path, "path");
        assert.strictEqual(
          data,
          '[\n  {\n    "empid": "2",\n    "beverages": "orange",\n    "qty": "1",\n    "date": "23/2/2000"\n  }\n]'
        );
        return;
      },
      exist: function(path) {
        assert.ok(path, "path");
        return false;
      }
    };
    let actual = performOperation(
      operation,
      parsedParameters,
      dateAndTime,
      path,
      fileSysc
    );
    let expected =
      "Transaction Recorded: " +
      "\n" +
      "Employee ID,Beverage,Quantity,Date" +
      "\n" +
      "2,orange,1,23/2/2000";
    assert.strictEqual(actual, expected);
  });
});
