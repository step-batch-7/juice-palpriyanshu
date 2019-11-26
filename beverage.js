const parseOperationAndParameter = require("./src/transactionRecord.js")
  .parseOperationAndParameter;

const main = function() {
  const cmdLineArg = process.argv.slice(2);
  const date = new Date();
  const result = parseOperationAndParameter(cmdLineArg, date);
  console.log(result);
};

main();
