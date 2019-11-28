const performOperation = require("./src/transactionRecord.js").performOperation;
const fs = require("fs");
const util = require("./src/utility.js");
const isValidInput = require("./src/inputValidation.js").isValidInput;
const getError = require("./src/utility.js").getError;

const main = function() {
  const operation = process.argv[2];
  const parameters = process.argv.slice(3);
  const parsedParameters = util.parseParameters(parameters);
  let date = new Date();
  const path = "./transactions.json";
  const fileSys = {
    reader: fs.readFileSync,
    writer: fs.writeFileSync,
    exist: fs.existsSync
  };
  const inputValidity = isValidInput(
    operation,
    parsedParameters,
    parameters.length
  );
  let result = getError();
  if (inputValidity) {
    result = performOperation(operation, parsedParameters, date, path, fileSys);
  }
  console.log(result);
};

main();
