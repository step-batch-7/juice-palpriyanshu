const generateCurrentTransaction = function(parsedParameters, dateAndTime) {
  const transaction = {
    empid: parsedParameters["--empid"],
    beverages: parsedParameters["--beverage"],
    qty: parsedParameters["--qty"],
    date: dateAndTime
  };
  return transaction;
};

const getPreviousTransactions = function(path, fileSys) {
  let previousTransactions = [];
  if (fileSys.exist(path)) {
    previousTransactions = fileSys.reader(path, "utf8");
    previousTransactions = JSON.parse(previousTransactions);
  }
  return previousTransactions;
};

const updateTransactions = function(previousTransactions, currentTransaction) {
  previousTransactions.push(currentTransaction);
  return previousTransactions;
};

const saveTransactions = function(updatedTransactions, path, fileSys) {
  updatedTransactions = JSON.stringify(updatedTransactions, null, 2);
  fileSys.writer(path, updatedTransactions, "utf8");
  return;
};

const generateSaveMessage = function(currentTransaction) {
  let message = "Transaction Recorded: ";
  message = message + "\n" + "Employee ID,Beverage,Quantity,Date";
  let fields = Object.values(currentTransaction);
  message = message + "\n" + fields;
  return message;
};

exports.generateCurrentTransaction = generateCurrentTransaction;
exports.getPreviousTransactions = getPreviousTransactions;
exports.updateTransactions = updateTransactions;
exports.saveTransactions = saveTransactions;
exports.generateSaveMessage = generateSaveMessage;
