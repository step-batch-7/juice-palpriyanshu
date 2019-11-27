const utility = require("./utility.js");
const readRecords = require("./readTransactions.js").readRecords;
const saved = require("./saveTransactions.js");

const generateCurrentTransaction = saved.generateCurrentTransaction;
const getPreviousTransactions = saved.getPreviousTransactions;
const updateTransactions = saved.updateTransactions;
const saveTransactions = saved.saveTransactions;
const generateSaveMessage = saved.generateSaveMessage;

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

const performOperation = function(
  operation,
  parsedParameters,
  dateAndTime,
  path,
  fileSys
) {
  const options = { "--save": performSaveOperation, "--query": readRecords };
  return options[operation](parsedParameters, dateAndTime, path, fileSys);
};

exports.performOperation = performOperation;
