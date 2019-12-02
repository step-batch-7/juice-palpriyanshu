const fs = require("fs");
const performOperation = require(`./src/transactionRecord.js`).performOperation;
const parseParameters = require(`./src/utility.js`).parseParameters;
const isValidInput = require(`./src/inputValidation.js`).isValidInput;
//const timeStamp = require(`./src/config.js`).timeStamp;
const { timeStamp, getPath } = require(`./src/config`);

const main = function() {
  const operation = process.argv[2];
  const parameters = process.argv.slice(3);
  const parsedParameters = parseParameters(parameters);
  let date = timeStamp(process.env);
  const fileSys = {
    reader: fs.readFileSync,
    writer: fs.writeFileSync,
    exist: fs.existsSync,
    path: getPath(process.env),
    encoder: `utf8`
  };
  const inputValidity = isValidInput(
    operation,
    parsedParameters,
    parameters.length
  );
  const result = performOperation(
    operation,
    parsedParameters,
    date,
    fileSys,
    inputValidity
  );
  console.log(result);
};

main();
