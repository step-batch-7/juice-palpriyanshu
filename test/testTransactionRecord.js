const assert = require("assert");
const performOperation = require("../src/transactionRecord.js")
  .performOperation;

const performQueryOperation = require("../src/transactionRecord.js")
  .performQueryOperation;

//
//   it("should give the msg for query transactions when file is exist", function() {
//     let path = "path";
//     let parsedParameters = { empId: "2", date: "2-3-2000" };
//     let dateAndTime = new Date();
//     let fileSysc = {
//       reader: function(path) {
//         assert.strictEqual(path, "path");
//         return '[{"empId": "2","date":"2-3-2000"}]';
//       },
//       exist: function(path) {
//         assert.ok(path, "path");
//         return true;
//       }
//     };
//     let actual = performQueryOperation(
//       parsedParameters,
//       dateAndTime,
//       path,
//       fileSysc
//     );
//     assert.deepStrictEqual(actual, { empId: "2", date: "2-3-2000" });
//   });
// });

describe("performOperation", function() {
  it("should perform the save operation when save option is present", function() {
    let operation = "--save";
    let parsedParameters = {
      "--beverage": "orange",
      "--empId": "2",
      "--qty": "1"
    };
    let dateAndTime = new Date();
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
          '[\n  {\n    "empId": 2,\n    "beverages": "orange",\n    "qty": 1,\n    "date": "' +
            dateAndTime.toJSON() +
            '"\n  }\n]'
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
      "2, orange, 1, " +
      dateAndTime.toJSON();
    assert.strictEqual(actual, expected);
  });

  it("should perform query operation when query option is present", function() {
    let operation = "--query";
    let parsedParameters = {
      "--beverage": "orange",
      "--empId": "2",
      "--qty": "1"
    };
    let dateAndTime = "23/2/2000";
    let path = "path";
    let fileSysc = {
      reader: function(path) {
        assert.strictEqual(path, "path");
        return "[]";
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
    assert.strictEqual(actual, "record not found");
  });
});
