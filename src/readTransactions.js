const sum = require("../src/utility.js").sum;

const fetchTransactions = function(fileSys) {
  let fetchedTransaction = fileSys.reader(fileSys.path, fileSys.encoder);
  return JSON.parse(fetchedTransaction);
};

const isCriteriaTrue = function(parsedParameters) {
  return function(transaction) {
    const empId = parsedParameters["--empId"] || transaction.empId;
    const beverage = parsedParameters["--beverage"] || transaction.beverages;
    const date = parsedParameters["--date"] || transaction.date.slice(0, 10);
    const validEmpId = empId == transaction.empId;
    const validBeverage = beverage == transaction.beverages;
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
  let text;
  let header = "Employee ID, Beverage, Quantity, Date";
  let fields = extractedTransactions.reduce(getFields, "\n");
  totalQty < 2 ? (text = `Juice`) : (text = `Juices`);
  let footer = `Total: ${totalQty} ${text}`;
  return header + fields + footer;
};

module.exports = {
  fetchTransactions,
  extractTransactions,
  getTotalQty,
  getMessageForQuery,
  isCriteriaTrue
};
