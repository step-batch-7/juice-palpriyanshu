const sum = require("../src/utility.js").sum;

const fetchTransactions = function(fileSys) {
  let fetchedTransaction = fileSys.reader(fileSys.path, fileSys.encoder);
  return JSON.parse(fetchedTransaction);
};

const isCriteriaTrue = function(parsedParameters) {
  return function(transaction) {
    const empId = parsedParameters["--empId"] || transaction.empId;
    const beverage = parsedParameters["--beverages"] || transaction.beverage;
    const date = parsedParameters["--date"] || transaction.date.slice(0, 10);
    const validEmpId = empId == transaction.empId;
    const validBeverage = beverage == transaction.beverage;
    const validDate = date == transaction.date.slice(0, 10);
    return validDate && validEmpId && validBeverage;
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
  let header = "Employee ID, Beverage, Quantity, Date";
  let message = extractedTransactions.reduce(getFields, "\n");
  let total = `Total: ${totalQty} Juice`;
  return header + message + total;
};

exports.fetchTransactions = fetchTransactions;
exports.extractTransactions = extractTransactions;
exports.getTotalQty = getTotalQty;
exports.getMessageForQuery = getMessageForQuery;
exports.isCriteriaTrue = isCriteriaTrue;
