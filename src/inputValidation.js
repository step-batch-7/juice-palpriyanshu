const isPositiveInt = require("./utility.js").isPositiveInt;

const isValidBeverage = function(parsedParameters) {
  const beverageOption = Object.keys(parsedParameters).includes("--beverage");
  const beverages = ["Orange", "Mango", "Apple"];
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
  const validEmpId = isValidOptionAndValue(parsedParameters, "--empId");
  const validQty = isValidOptionAndValue(parsedParameters, "--qty");
  const validLength = length == 6;
  return validBeverage && validEmpId && validQty && validLength;
};

const isValidQueryParameters = function(parsedParameters, length) {
  const validLength = length == 2 || length == 4 || length == 6;
  const validEmpId = isValidOptionAndValue(parsedParameters, "--empId");
  const validBeverage = isValidBeverage(parsedParameters);
  return validLength && (validEmpId || validBeverage);
};

const isValidInput = function(operation, parsedParameters, length) {
  let saveValidity =
    operation == "--save" && isValidSaveParameters(parsedParameters, length);
  let queryValidity =
    operation == "--query" && isValidQueryParameters(parsedParameters, length);
  return saveValidity || queryValidity;
};

module.exports = {
  isValidSaveParameters,
  isValidQueryParameters,
  isValidBeverage,
  isValidOptionAndValue,
  isValidInput
};
