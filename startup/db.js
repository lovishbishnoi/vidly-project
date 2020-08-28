const mongoose = require('mongoose');
const logger = require('../config/winston');
const connectionurl = require('../db-config');

module.exports = function (app) {
  // MONGO CONNECTION
  mongoose.connect(connectionurl(), { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true  })
      .then(() => {
          if(app.get('env') === 'development'){
              logger.log({
                level: 'info',
                message: 'Connected to mongodb...'
              });
          }
      });
}
