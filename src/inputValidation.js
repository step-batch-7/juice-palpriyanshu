const isPositiveInt = require("./utility.js").isPositiveInt;

const isValidBeverage = function(parsedParameters) {
  const beverageOption = Object.keys(parsedParameters).includes("--beverage");
  const beverages = ["orange", "mango", "apple"];
  const beverageValue = beverages.includes(parsedParameters["--beverage"]);
  return beverageOption && beverageValue;
};

const isValidOptionAndValue = function(parsedParameters, option) {
  const options = Object.keys(parsedParameters).includes(option);
  const value = isPositiveInt(parsedParameters[option]);
  return options && value;
};

const isValidSaveParameters = function(parsedParameters, length) {
  const validBeverage = isValidBeverage(parsedParameters);
  const validEmpid = isValidOptionAndValue(parsedParameters, "--empid");
  const validQty = isValidOptionAndValue(parsedParameters, "--qty");
  const validLength = length == 6;
  return validBeverage && validEmpid && validQty && validLength;
};

const isValidQueryParameters = function(parsedParameters, length) {
  const validLength = length == 2;
  const validEmpid = isValidOptionAndValue(parsedParameters, "--empid");
  return validLength && validEmpid;
};

const isValidInput = function(operation, parsedParameters, length) {
  let saveValidity =
    operation == "--save" && isValidSaveParameters(parsedParameters, length);
  let queryValidity =
    operation == "--query" && isValidQueryParameters(parsedParameters, length);
  return saveValidity || queryValidity;
};

exports.isValidSaveParameters = isValidSaveParameters;
exports.isValidQueryParameters = isValidQueryParameters;
exports.isValidBeverage = isValidBeverage;
exports.isValidOptionAndValue = isValidOptionAndValue;
exports.isValidInput = isValidInput;
