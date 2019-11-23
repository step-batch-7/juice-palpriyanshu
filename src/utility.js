const getError = function(){
  console.log("wrong Input");
};

const isIncludeOption = function(options, option){
  return Object.keys(options).includes(option);
};

exports.getError = getError;
exports.isIncludeOption = isIncludeOption;