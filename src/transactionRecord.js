const fs = require("fs");
const getError = require("./utility.js").getError;
const isIncludeOption = require("./utility.js").isIncludeOption;
const readRecords = require("./readTransactions.js").readRecords;
const isValidSaveParameters = require("./inputValidation.js")
  .isValidSaveParameters;
const getTransactionFields = require("./utility.js").getTransactionFields;

const path = "./transactions.json";

const getTransaction = function(transactionFields, dateAndTime) {
  const transaction = {
    empid: transactionFields["--empid"],
    beverages: transactionFields["--beverage"],
    qty: transactionFields["--qty"],
    date: dateAndTime
  };
  return transaction;
};

const getPreviousTransactions = function(path) {
  let previousTransactions = {};
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, JSON.stringify(previousTransactions), "utf8");
  }
  previousTransactions = fs.readFileSync(path, "utf8");
  previousTransactions = JSON.parse(previousTransactions);
  return previousTransactions;
};

const getTransactionRecord = function(transactionFields, dateAndTime, path) {
  let transactionRecord = getPreviousTransactions(path);
  const id = transactionFields["--empid"];
  if (!isIncludeOption(transactionRecord, id)) {
    transactionRecord[id] = [];
  }
  const record = getTransaction(transactionFields, dateAndTime);
  transactionRecord[id].push(record);
  return transactionRecord;
};

const insertRecord = function(parameters, dateAndTime, path) {
  if (isValidSaveParameters(parameters)) {
    const transactionFields = getTransactionFields(parameters);
    let transactions = getTransactionRecord(
      transactionFields,
      dateAndTime,
      path
    );
    transactions = JSON.stringify(transactions, null, 2);
    fs.writeFileSync(path, transactions, "utf8");
    return transactions;
  }
  return getError();
};

const parseOperationAndParameter = function(cmdLineArg, dateAndTime) {
  const options = { "--save": insertRecord, "--query": readRecords };
  let operationName = cmdLineArg[0];
  const parameters = cmdLineArg.slice(1);
  if (isIncludeOption(options, operationName)) {
    return options[operationName](parameters, dateAndTime, path);
  }
  return getError();
};

exports.parseOperationAndParameter = parseOperationAndParameter;
exports.getTransaction = getTransaction;
exports.getPreviousTransactions = getPreviousTransactions;
exports.getTransactionRecord = getTransactionRecord;
