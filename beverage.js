const fs = require("fs");
const performOperation = require("./src/transactionRecord.js").performOperation;
const util = require("./src/utility.js");
const isValidInput = require("./src/inputValidation.js").isValidInput;
const getError = require("./src/utility.js").getError;

const main = function() {
  const operation = process.argv[2];
  const parameters = process.argv.slice(3);
  const parsedParameters = util.parseParameters(parameters);
  let date = new Date();
  const fileSys = {
    reader: fs.readFileSync,
    writer: fs.writeFileSync,
    exist: fs.existsSync,
    path: "./transactions.json",
    encoder: "utf8"
  };
  const inputValidity = isValidInput(
    operation,
    parsedParameters,
    parameters.length
  );
  let result = getError();
  if (inputValidity) {
    result = performOperation(operation, parsedParameters, date, fileSys);
  }
  console.log(result);
};

main();
