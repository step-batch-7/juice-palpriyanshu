const timeStamp = function(env) {
  let date = env.date || new Date().toJSON();
  return new Date(date);
};

const getPath = function(env) {
  return env.JS_PATH || `./transactions.json`;
};

module.exports = { timeStamp, getPath };
