//const utility = require("./utility.js");
const getError = require("./utility.js").getError;

const read = require("./readTransactions.js");
const saved = require("./saveTransactions.js");

const generateCurrentTransaction = saved.generateCurrentTransaction;
const getPreviousTransactions = saved.getPreviousTransactions;
const updateTransactions = saved.updateTransactions;
const saveTransactions = saved.saveTransactions;
const generateSaveMessage = saved.generateSaveMessage;
const fetchTransactions = read.fetchTransactions;
const extractTransactions = read.extractTransactions;
const getTotalQty = read.getTotalQty;
const getMessageForQuery = read.getMessageForQuery;

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
  let message = "record not found";
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

exports.performOperation = performOperation;
exports.performQueryOperation = performQueryOperation;
exports.performSaveOperation = performSaveOperation;
