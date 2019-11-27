const utility = require("./utility.js");
const read = require("./readTransactions.js");
const saved = require("./saveTransactions.js");

const generateCurrentTransaction = saved.generateCurrentTransaction;
const getPreviousTransactions = saved.getPreviousTransactions;
const updateTransactions = saved.updateTransactions;
const saveTransactions = saved.saveTransactions;
const generateSaveMessage = saved.generateSaveMessage;
const fetchTransactions = read.fetchTransactions;

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
  let fetchedTransactions = "record not found";
  if (fileSys.exist(path)) {
    fetchedTransactions = fetchTransactions(path, fileSys);
  }
  return fetchedTransactions;
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
