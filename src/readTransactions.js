const fs = require("fs");
const isValidQueryParameters = require("./inputValidation.js")
  .isValidQueryParameters;
const utility = require("./utility.js");

const getError = utility.getError;
const getTransactionFields = utility.getTransactionFields;

const getTransactionField = function(empid) {
  const transactionFields = Object.values(empid);
  return transactionFields.join(",");
};

const getMessage = function(transactionFieldVal) {
  let message = "empid , beverage , qty , date";
  message = message + "\n" + transactionFieldVal;
  return message;
};

const readRecords = function(parameters, dateAndTime, path, encoder, fileSys) {
  if (isValidQueryParameters(parameters)) {
    const transactionFields = getTransactionFields(parameters);
    let transactionRecord = fileSys.reader(path, encoder);
    const empid = transactionFields["--empid"];
    transactionRecord = JSON.parse(transactionRecord);
    if (transactionRecord[empid] == undefined) {
      return getError();
    }
    const transactionFieldAsString = transactionRecord[empid]
      .map(getTransactionField)
      .join("\n");
    const message = getMessage(transactionFieldAsString);
    return message;
  }
  return getError();
};

exports.readRecords = readRecords;
