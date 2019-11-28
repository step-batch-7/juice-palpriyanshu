const fs = require("fs");
const sum = require("../src/utility.js").sum;

const fetchTransactions = function(path, fileSys) {
  let fetchedTransaction = fileSys.reader(path, "utf8");
  return JSON.parse(fetchedTransaction);
};

const isCriteriaTrue = function(parsedParameters) {
  return function(transaction) {
    const empId = transaction["empId"] == parsedParameters["--empId"];
    console.log("tra-->", transaction["date"].toJSON().slice(0, 10));
    console.log("par-->", parsedParameters["--date"]);
    const date =
      transaction["date"].toJSON().slice(0, 10) == parsedParameters["--date"];
    return empId || date;
  };
};

const extractTransactions = function(fetchedTransactions, parsedParameters) {
  return fetchedTransactions.filter(isCriteriaTrue(parsedParameters));
};

const getTotalQty = function(extractedTransactions) {
  const total = extractedTransactions.reduce(sum, 0);
  return total;
};

const getFields = function(context, transactions) {
  context = context + Object.values(transactions).toString() + "\n";
  return context;
};

const getMessageForQuery = function(extractedTransactions, totalQty) {
  let fields = extractedTransactions.reduce(getFields, "\n");
  let header = "Employee Id, Beverage, Quantity, Date";
  let message = fields;
  let total = "total : " + totalQty + " juice";
  return header + message + total;
};

exports.fetchTransactions = fetchTransactions;
exports.extractTransactions = extractTransactions;
exports.getTotalQty = getTotalQty;
exports.getMessageForQuery = getMessageForQuery;
exports.isCriteriaTrue = isCriteriaTrue;
