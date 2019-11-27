const performOperation = require("./src/transactionRecord.js").performOperation;
const fs = require("fs");
const util = require("./src/utility.js");
const isValidInput = require("./src/inputValidation.js").isValidInput;

const main = function() {
  const operation = process.argv[2];
  const parameters = process.argv.slice(3);
  const parsedParameters = util.parseParameters(parameters);
  const inputValidity = isValidInput(
    operation,
    parsedParameters,
    parameters.length
  );
  let date = new Date();
  const path = "./transactions.json";
  const fileSys = {
    reader: fs.readFileSync,
    writer: fs.writeFileSync,
    exist: fs.existsSync
  };
  const result = performOperation(
    operation,
    parsedParameters,
    date,
    path,
    fileSys
  );
  console.log(result);
};

main();
