const fs = require('fs');
const getError = require('./utility.js').getError;
const isIncludeOption = require('./utility.js').isIncludeOption;

const getOption = function(cmdlineArg){
  return cmdlineArg[0];
};

const getStructure = function(details){
  const structure = {
    "empid": details[3],
    "bevarages": details[1],
    "qty": details[5],
    "date":new Date()
  };
  return structure;
};

const getRecord = function(details){
  let previousRecord = fs.readFileSync('./bevarageRecords.json',"utf8");
  if(previousRecord == "") {
    previousRecord = '{}'
  };
  previousRecord = JSON.parse(previousRecord);
  const id = details[3];
  if(!isIncludeOption(previousRecord,details[3])){
   previousRecord[id] = [];
  }
   const record = getStructure(details);
   previousRecord[id].push(record);
   console.log(previousRecord)
   return previousRecord;
};
  


const insertRecord = function(details){
  const record = getRecord(details);
  const recordAsString = JSON.stringify(record);
  fs.writeFileSync("./bevarageRecords.json",recordAsString,"utf8");
  return record;
};

const executeOption = function(option, details){
  const options = {"--save" : insertRecord};
  if(isIncludeOption(options,option)) {
    return options[option](details);
  };
  return getError();
};

exports.getOption = getOption;
exports.executeOption = executeOption;
exports.getStructure = getStructure;