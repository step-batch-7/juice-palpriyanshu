const getOption = require('./src/transactionRecord.js').getOption;
const executeOption = require('./src/transactionRecord.js').executeOption;

const main = function(){
  const cmdLineArg = process.argv.slice(2);
  const option = getOption(cmdLineArg);
  const details = process.argv.slice(3); 
  const result = executeOption(option,details);
};

main();