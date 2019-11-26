const utility = require("./utility.js");
const readRecords = require("./readTransactions.js").readRecords;
const isValidSaveParameters = require("./inputValidation.js")
  .isValidSaveParameters;

const isIncludeOption = utility.isIncludeOption;
const getTransactionFields = utility.getTransactionFields;
const getError = utility.getError;

const getTransaction = function(transactionFields, dateAndTime) {
  const transaction = {
    empid: transactionFields["--empid"],
    beverages: transactionFields["--beverage"],
    qty: transactionFields["--qty"],
    date: dateAndTime
  };
  return transaction;
};

const getPreviousTransactions = function(path, encoder, fileSys) {
  let previousTransactions = {};
  if (!fileSys.exist(path)) {
    fileSys.writer(path, JSON.stringify(previousTransactions), encoder);
  }
  previousTransactions = fileSys.reader(path, encoder);
  previousTransactions = JSON.parse(previousTransactions);
  return previousTransactions;
};

const getTransactionRecord = function(
  transactionFields,
  dateAndTime,
  path,
  encoder,
  fileSys
) {
  let transactionRecord = getPreviousTransactions(path, encoder, fileSys);
  const id = transactionFields["--empid"];
  if (!isIncludeOption(transactionRecord, id)) {
    transactionRecord[id] = [];
  }
  const record = getTransaction(transactionFields, dateAndTime);
  transactionRecord[id].push(record);
  return transactionRecord;
};

const saveRecord = function(parameters, dateAndTime, path, encoder, fileSys) {
  if (isValidSaveParameters(parameters)) {
    const transactionFields = getTransactionFields(parameters);
    let transactions = getTransactionRecord(
      transactionFields,
      dateAndTime,
      path,
      encoder,
      fileSys
    );
    transactions = JSON.stringify(transactions, null, 2);
    fileSys.writer(path, transactions, encoder);
    return transactions;
  }
  return getError();
};

const parseOperationAndParameter = function(
  cmdLineArg,
  dateAndTime,
  path,
  encoder,
  fileSys
) {
  const options = { "--save": saveRecord, "--query": readRecords };
  let operationName = cmdLineArg[0];
  const parameters = cmdLineArg.slice(1);
  if (isIncludeOption(options, operationName)) {
    return options[operationName](
      parameters,
      dateAndTime,
      path,
      encoder,
      fileSys
    );
  }
  return getError();
};

exports.parseOperationAndParameter = parseOperationAndParameter;
exports.getTransaction = getTransaction;
exports.getPreviousTransactions = getPreviousTransactions;
exports.getTransactionRecord = getTransactionRecord;
exports.saveRecord = saveRecord;
