const utility = require("./utility.js");
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

const performSaveOperation = function(
  parsedParameters,
  dateAndTime,
  path,
  fileSys
) {
  const currentTransaction = generateCurrentTransaction(
    parsedParameters,
    dateAndTime
  );
  const previousTransactions = getPreviousTransactions(path, fileSys);
  const updatedTransactions = updateTransactions(
    previousTransactions,
    currentTransaction
  );
  const savedTransactions = saveTransactions(
    updatedTransactions,
    path,
    fileSys
  );
  const message = generateSaveMessage(currentTransaction);
  return message;
};

const performQueryOperation = function(
  parsedParameters,
  dateAndTime,
  path,
  fileSys
) {
  let message = "record not found";
  if (fileSys.exist(path)) {
    const fetchedTransactions = fetchTransactions(path, fileSys);
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
  path,
  fileSys
) {
  const options = {
    "--save": performSaveOperation,
    "--query": performQueryOperation
  };
  return options[operation](parsedParameters, dateAndTime, path, fileSys);
};

exports.performOperation = performOperation;
exports.performQueryOperation = performQueryOperation;
exports.performSaveOperation = performSaveOperation;
