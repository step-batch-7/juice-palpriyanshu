const timeStamp = function(env) {
  const date = env.date ? new Date(env.date) : new Date();
  return date;
};

const getPath = function(env) {
  return env.JS_PATH || `./transactions.json`;
};

module.exports = { timeStamp, getPath };
