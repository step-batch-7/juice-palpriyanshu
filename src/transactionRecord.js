const getError = require("./utility.js").getError;

const {
  generateCurrentTransaction,
  getPreviousTransactions,
  updateTransactions,
  saveTransactions,
  generateSaveMessage
} = require("./saveTransactions.js");
const {
  fetchTransactions,
  extractTransactions,
  getTotalQty,
  getMessageForQuery
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
  const savedTransactions = saveTransactions(updatedTransactions, fileSys);
  const message = generateSaveMessage(currentTransaction);
  return message;
};

const performQueryOperation = function(parsedParameters, dateAndTime, fileSys) {
  let message = getMessageForQuery([], 0);
  if (fileSys.exist(fileSys.path)) {
    const fetchedTransactions = fetchTransactions(fileSys);
    const extractedTransactions = extractTransactions(
      fetchedTransactions,
      parsedParameters
    );
    const totalQty = getTotalQty(extractedTransactions);
    const messageForQuery = getMessageForQuery(extractedTransactions, totalQty);
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
