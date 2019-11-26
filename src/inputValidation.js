const getTransactionFields = require("./utility.js").getTransactionFields;
const isPositiveInt = require("./utility.js").isPositiveInt;

const isValidBeverage = function(transactionFields) {
  const beverageOption = Object.keys(transactionFields).includes("--beverage");
  const beverages = ["orange", "mango", "apple"];
  const beverageValue = beverages.includes(transactionFields["--beverage"]);
  return beverageOption && beverageValue;
};

const isValidOptionAndValue = function(transactionFields, option) {
  const options = Object.keys(transactionFields).includes(option);
  const value = isPositiveInt(transactionFields[option]);
  return options && value;
};

const isValidSaveParameters = function(parameters) {
  const transactionFields = getTransactionFields(parameters);
  const validBeverage = isValidBeverage(transactionFields);
  const validEmpid = isValidOptionAndValue(transactionFields, "--empid");
  const validQty = isValidOptionAndValue(transactionFields, "--qty");
  const validLength = parameters.length == 6;
  return validBeverage && validEmpid && validQty && validLength;
};

const isValidQueryParameters = function(parameters) {
  const transactionFields = getTransactionFields(parameters);
  const validLength = parameters.length == 2;
  const validEmpid = isValidOptionAndValue(transactionFields, "--empid");
  return validLength && validEmpid;
};

exports.isValidSaveParameters = isValidSaveParameters;
exports.isValidQueryParameters = isValidQueryParameters;
exports.isValidBeverage = isValidBeverage;
exports.isValidOptionAndValue = isValidOptionAndValue;
