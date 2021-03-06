const isPositiveInt = require("./utility.js").isPositiveInt;

const isValidOptionAndValue = function(parsedParameters, option) {
  const options = Object.keys(parsedParameters).includes(option);
  const value = isPositiveInt(parsedParameters[option]);
  return options && value;
};

const isValidSaveParameters = function(parsedParameters, length) {
  const validBeverage = Object.keys(parsedParameters).includes("--beverage");
  const validEmpId = isValidOptionAndValue(parsedParameters, "--empId");
  const validQty = isValidOptionAndValue(parsedParameters, "--qty");
  const validLength = length == 6;
  return validBeverage && validEmpId && validQty && validLength;
};

const isValidQueryParameters = function(parsedParameters, length) {
  const validLength = length == 2 || length == 4 || length == 6;
  const validEmpId = isValidOptionAndValue(parsedParameters, "--empId");
  const validBeverage = Object.keys(parsedParameters).includes("--beverage");
  const validDate = Object.keys(parsedParameters).includes("--date");
  return validLength && (validEmpId || validBeverage || validDate);
};

const isValidInput = function(operation, parsedParameters, length) {
  const saveValidity =
    operation == "--save" && isValidSaveParameters(parsedParameters, length);
  const queryValidity =
    operation == "--query" && isValidQueryParameters(parsedParameters, length);
  return saveValidity || queryValidity;
};

module.exports = {
  isValidSaveParameters,
  isValidQueryParameters,
  isValidOptionAndValue,
  isValidInput
};
