const read = require("../src/readTransactions.js");
const assert = require("assert");

const fetchTransactions = read.fetchTransactions;
const extractTransactions = read.extractTransactions;
const getTotalQty = read.getTotalQty;
const isCriteriaTrue = read.isCriteriaTrue;

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
  it("should extract the transactions on the basis of empId", function() {
    let dateAndTime = new Date();
    let date = new Date("2019-11-28T09:39:22.955Z");
    let fetchedTransactions = [
      { empId: 1, date: dateAndTime },
      { empId: 2, date: dateAndTime },
      { empId: 1, date: date }
    ];
    let parsedParameters = { "--empId": 2 };
    assert.deepStrictEqual(
      extractTransactions(fetchedTransactions, parsedParameters),
      [{ empId: 2, date: dateAndTime }]
    );
  });

  // it("should extract the transactions on the basis of date", function() {
  //   let dateAndTime = new Date();
  //   let date = new Date("2019-11-28T09:39:22.955Z");
  //   let fetchedTransactions = [
  //     { empId: 1, date: dateAndTime },
  //     { empId: 2, date: dateAndTime },
  //     { empId: 1, date: date }
  //   ];
  //   let criteria = "2019-11-27";
  //   assert.deepStrictEqual(extractTransactions(fetchedTransactions, criteria), [
  //     { empId: 1, date: dateAndTime },
  //     { empId: 2, date: dateAndTime }
  //   ]);
  // });
});

describe("getTotalQty", function() {
  it("should add qty of juice", function() {
    let extractedTransactions = [
      { empId: 1, qty: 2 },
      { empId: 1, qty: 3 }
    ];
    assert.strictEqual(getTotalQty(extractedTransactions), 5);
  });
});

describe("isCriteriaTrue", function() {
  it("should validate when employee Id is given", function() {
    let dateAndTime = new Date();
    let transaction = {
      empId: "2",
      beverage: "orange",
      qty: "1",
      date: dateAndTime
    };
    parsedParameters = { "--empId": 2 };
    assert.ok(isCriteriaTrue(parsedParameters)(transaction));
  });

  it("should invalidate when wrong employee Id is given", function() {
    let dateAndTime = new Date();
    let transaction = {
      empId: "2",
      beverage: "orange",
      qty: "1",
      date: dateAndTime
    };
    parsedParameters = { "--empId": 67 };
    assert.ok(!isCriteriaTrue(parsedParameters)(transaction));
  });

  it("should validate when date is given", function() {
    let dateAndTime = new Date();
    let transaction = {
      empId: "2",
      beverage: "orange",
      qty: "1",
      date: dateAndTime
    };
    let parsedParameters = { "--date": "2019-11-28" };
    assert.ok(isCriteriaTrue(parsedParameters)(transaction));
  });

  it("should invalidate when wrong date is given", function() {
    let dateAndTime = new Date();
    let transaction = {
      empId: "2",
      beverage: "orange",
      qty: "1",
      date: dateAndTime
    };
    let parsedParameters = { "--date": "2019-11-23" };
    assert.ok(!isCriteriaTrue(parsedParameters)(transaction));
  });
});
