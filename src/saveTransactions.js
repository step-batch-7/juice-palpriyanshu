const generateCurrentTransaction = function(parsedParameters, dateAndTime) {
  const transaction = {
    empId: +parsedParameters["--empId"],
    beverages: parsedParameters["--beverage"],
    qty: +parsedParameters["--qty"],
    date: dateAndTime
  };
  return transaction;
};

const getPreviousTransactions = function(fileSys) {
  let previousTransactions = [];
  if (fileSys.exist(fileSys.path)) {
    previousTransactions = fileSys.reader(fileSys.path, fileSys.encoder);
    previousTransactions = JSON.parse(previousTransactions);
  }
  return previousTransactions;
};

const updateTransactions = function(previousTransactions, currentTransaction) {
  previousTransactions.push(currentTransaction);
  return previousTransactions;
};

const saveTransactions = function(updatedTransactions, fileSys) {
  updatedTransactions = JSON.stringify(updatedTransactions, null, 2);
  fileSys.writer(fileSys.path, updatedTransactions, fileSys.encoder);
  return;
};

const generateSaveMessage = function(currentTransaction) {
  let fields = `${currentTransaction.empId},${currentTransaction.beverages},${
    currentTransaction.qty
  },${currentTransaction.date.toJSON()}`;
  let message = `Transaction Recorded:`;
  let header = `Employee ID,Beverage,Quantity,Date`;
  return [message, header, fields].join("\n");
};

exports.generateCurrentTransaction = generateCurrentTransaction;
exports.getPreviousTransactions = getPreviousTransactions;
exports.updateTransactions = updateTransactions;
exports.saveTransactions = saveTransactions;
exports.generateSaveMessage = generateSaveMessage;
