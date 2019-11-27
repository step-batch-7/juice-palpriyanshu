const fs = require("fs");

const fetchTransactions = function(path, fileSys) {
  let fetchedTransaction = fileSys.reader(path, "utf8");
  return JSON.parse(fetchedTransaction);
};

exports.fetchTransactions = fetchTransactions;
