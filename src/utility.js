const getError = function() {
  const msg = "wrong Input";
  return msg;
};

const isIncludeOption = function(options, option) {
  return Object.keys(options).includes(option);
};

const parseParameters = function(parameters) {
  let arg = {};
  for (let idx = 0; idx < parameters.length; idx = idx + 2) {
    arg[parameters[idx]] = parameters[idx + 1];
  }
  return arg;
};

const isPositiveInt = function(num) {
  return +num > 0 && Number.isInteger(+num);
};

const sum = function(element1, element2) {
  return element1 + element2.qty;
};

module.exports = {
  getError,
  isIncludeOption,
  parseParameters,
  isPositiveInt,
  sum
};
