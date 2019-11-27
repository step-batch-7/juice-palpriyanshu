const fs = require("fs");

const fetchTransactions = function(path, fileSys) {
  let fetchedTransaction = fileSys.reader(path, "utf8");
  return JSON.parse(fetchedTransaction);
};

const isCriteriaTrue = function(creterionValue) {
  return function(transaction) {
    const empid = transaction["empid"] == creterionValue;
    const date = transaction["date"] == creterionValue;
    return empid || date;
  };
};

const extractTransactions = function(fetchedTransactions, criterionValue) {
  return fetchedTransactions.filter(isCriteriaTrue(criterionValue));
};

exports.fetchTransactions = fetchTransactions;
exports.extractTransactions = extractTransactions;
