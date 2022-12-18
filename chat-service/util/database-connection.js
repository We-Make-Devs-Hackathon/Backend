const mongoose = require('mongoose');

global.disconnectDatabase = () => { };

mongoose.connect(process.env.MONGO_DB_CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  minPoolSize: process.env.MONGO_DB_MIN_POOL_SIZE || 1,
  maxPoolSize: process.env.MONGO_DB_MAX_POOL_SIZE || 2,
}).then(databaseConnection => {

  global.databaseConnection = databaseConnection;
  global.disconnectDatabase = () => {
    global.databaseConnection.disconnect();
  };

});

module.exports = {
  mongoose,
};
