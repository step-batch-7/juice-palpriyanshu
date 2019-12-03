const getError = require("./utility.js").getError;

const {
  generateCurrentTransaction,
  getPreviousTransactions,
  updateTransactions,
  saveTransactions,
  generateSaveMsg
} = require("./saveTransactions.js");
const {
  fetchTransactions,
  extractTransactions,
  getTotalQty,
  getMsgForQuery
} = require("./readTransactions.js");

const performSaveOperation = function(parsedParameters, dateAndTime, fileSys) {
  const currentTransaction = generateCurrentTransaction(
    parsedParameters,
    dateAndTime
  );
  const previousTransactions = getPreviousTransactions(fileSys);
  const updatedTransactions = updateTransactions(
    previousTransactions,
    currentTransaction
  );
  saveTransactions(updatedTransactions, fileSys);
  return generateSaveMsg(currentTransaction);
};

const performQueryOperation = function(parsedParameters, dateAndTime, fileSys) {
  let message = getMsgForQuery([], 0);
  if (fileSys.exist(fileSys.path)) {
    const fetchedTransactions = fetchTransactions(fileSys);
    const extractedTransactions = extractTransactions(
      fetchedTransactions,
      parsedParameters
    );
    const totalQty = getTotalQty(extractedTransactions);
    const messageForQuery = getMsgForQuery(extractedTransactions, totalQty);
    message = messageForQuery;
  }
  return message;
};

const performOperation = function(
  operation,
  parsedParameters,
  dateAndTime,
  fileSys,
  inputValidity
) {
  if (inputValidity) {
    const options = {
      "--save": performSaveOperation,
      "--query": performQueryOperation
    };
    return options[operation](parsedParameters, dateAndTime, fileSys);
  }
  return getError();
};

module.exports = {
  performOperation,
  performQueryOperation,
  performSaveOperation
};
