const fs = require("fs");
const isValidQueryParameters = require("./inputValidation.js")
  .isValidQueryParameters;
const getError = require("./utility.js").getError;
const getTransactionFields = require("./utility.js").getTransactionFields;

const getTransactionField = function(empid) {
  const transactionFields = Object.values(empid);
  return transactionFields.join(",");
};

const getMessage = function(transactionFieldVal) {
  let message = "empid , beverage , qty , date";
  message = message + "\n" + transactionFieldVal;
  return message;
};

const readRecords = function(parameters, dateAndTime, path) {
  if (isValidQueryParameters(parameters)) {
    const transactionFields = getTransactionFields(parameters);
    let transactionRecord = fs.readFileSync(path, "utf8");
    const empid = transactionFields["--empid"];
    transactionRecord = JSON.parse(transactionRecord);
    if (transactionRecord[empid] == undefined) {
      return getError();
    }
    const transactionFieldVal = transactionRecord[empid]
      .map(getTransactionField)
      .join("\n");
    const message = getMessage(transactionFieldVal);
    return message;
  }
  return getError();
};

exports.readRecords = readRecords;
