const read = require("../src/readTransactions.js");
const assert = require("assert");

const fetchTransactions = read.fetchTransactions;
const extractTransactions = read.extractTransactions;
const getTotalQty = read.getTotalQty;
const isCriteriaTrue = read.isCriteriaTrue;
const getMessageForQuery = read.getMessageForQuery;

describe("fetchTransactions", function() {
  it("should fetch the transactions from file when file is exist", function() {
    let fileSysc = {
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
    assert.deepStrictEqual(fetchTransactions(fileSysc), []);
  });
});

describe("extractTransactions", function() {
  it("should extract the transactions on the basis of empId", function() {
    let dateAndTime = new Date().toJSON();
    let date = new Date("2019-11-28T09:39:22.955Z").toJSON();
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

  it("should extract the transactions on the basis of date", function() {
    let dateAndTime = new Date(`2019-11-29T02:36:28.472Z`).toJSON();
    let date = new Date("2019-11-26T09:39:22.955Z").toJSON();
    let fetchedTransactions = [
      { empId: 1, date: dateAndTime },
      { empId: 2, date: dateAndTime },
      { empId: 1, date: date }
    ];
    let parsedParameters = { "--date": "2019-11-29" };

    let actual = extractTransactions(fetchedTransactions, parsedParameters);
    let expected = [
      { empId: 1, date: dateAndTime },
      { empId: 2, date: dateAndTime }
    ];
    assert.deepStrictEqual(actual, expected);
  });

  it("should extract the transactions on the basis of beverage", function() {
    let dateAndTime = new Date().toJSON();
    let date = new Date("2019-11-29T09:39:22.955Z").toJSON();
    let fetchedTransactions = [
      { empId: 1, date: dateAndTime, beverage: "apple" },
      { empId: 2, date: dateAndTime, beverage: "orange" },
      { empId: 3, date: date, beverage: "apple" }
    ];
    let parsedParameters = { "--beverages": "apple" };
    let actual = extractTransactions(fetchedTransactions, parsedParameters);
    assert.deepStrictEqual(actual, [
      { empId: 1, date: dateAndTime, beverage: "apple" },
      { empId: 3, date: date, beverage: "apple" }
    ]);
  });
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
    let dateAndTime = new Date().toJSON();
    let transaction = {
      empId: 2,
      beverage: "orange",
      qty: 1,
      date: dateAndTime
    };
    parsedParameters = { "--empId": 2 };
    assert.ok(isCriteriaTrue(parsedParameters)(transaction));
  });

  it("should invalidate when wrong employee Id is given", function() {
    let dateAndTime = new Date().toJSON();
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
    let dateAndTime = new Date(`2019-11-29T02:36:28.472Z`).toJSON();
    let transaction = {
      empId: 2,
      beverage: "orange",
      qty: 1,
      date: dateAndTime
    };
    let parsedParameters = { "--date": "2019-11-29" };
    assert.ok(isCriteriaTrue(parsedParameters)(transaction));
  });

  it("should invalidate when wrong date is given", function() {
    let dateAndTime = new Date().toJSON();
    let transaction = {
      empId: "2",
      beverage: "orange",
      qty: "1",
      date: dateAndTime
    };
    let parsedParameters = { "--date": "2019-11-23" };
    assert.ok(!isCriteriaTrue(parsedParameters)(transaction));
  });

  it("should validate when both empId and date is correct", function() {
    let dateAndTime = new Date(`2019-11-29T02:36:28.472Z`).toJSON();
    let transaction = {
      empId: 2,
      beverage: "orange",
      qty: 1,
      date: dateAndTime
    };
    let parsedParameters = { "--date": "2019-11-29", "--empId": 2 };
    assert.ok(isCriteriaTrue(parsedParameters)(transaction));
  });

  it("should validate when both empId and date is wrong", function() {
    let dateAndTime = new Date().toJSON();
    let transaction = {
      empId: 1,
      beverage: "orange",
      qty: 1,
      date: dateAndTime
    };
    let parsedParameters = { "--date": "2019-11-23", "--empId": 2 };
    assert.ok(!isCriteriaTrue(parsedParameters)(transaction));
  });

  it("should validate when beverage is given", function() {
    let dateAndTime = new Date().toJSON();
    let transaction = {
      empId: 2,
      beverage: "orange",
      qty: 1,
      date: dateAndTime
    };
    let parsedParameters = { "--beverages": "orange" };
    assert.ok(isCriteriaTrue(parsedParameters)(transaction));
  });

  it("should invalidate when wrong beverage is given", function() {
    let dateAndTime = new Date().toJSON();
    let transaction = {
      empId: 2,
      beverage: "orange",
      qty: 1,
      date: dateAndTime
    };
    let parsedParameters = { "--beverages": "chair" };
    assert.ok(!isCriteriaTrue(parsedParameters)(transaction));
  });
});

describe("getMessageForQuery", function() {
  it("should return the message after getting query option", function() {
    let extractedTransactions = [
      { empId: 2, beverage: "orange", qty: 3 },
      { empId: 2, beverage: "apple", qty: 2 }
    ];
    let totalQty = 5;
    let header = `Employee ID, Beverage, Quantity, Date`;
    let total = `Total: ${totalQty} Juice`;
    let expected = `${header}\n2,orange,3\n2,apple,2\n${total}`;
    let actual = getMessageForQuery(extractedTransactions, totalQty);
    assert.strictEqual(actual, expected);
  });
});
