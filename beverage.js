const parseOperationAndParameter = require("./src/transactionRecord.js")
  .parseOperationAndParameter;
const fs = require("fs");

const main = function() {
  const cmdLineArg = process.argv.slice(2);
  const path = "./transactions.json";
  const date = new Date();
  const encoder = "utf8";
  const fileSys = {
    reader: fs.readFileSync,
    writer: fs.writeFileSync,
    exist: fs.existsSync
  };
  const result = parseOperationAndParameter(
    cmdLineArg,
    date,
    path,
    encoder,
    fileSys
  );
  console.log(result);
};

main();
