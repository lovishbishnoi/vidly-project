require('express-async-errors');

const express = require('express');
const config = require('config');
const bootdebug = require('debug')('app:boot');
const logger = require('./config/winston');

const app = express();
const PORT = process.env.PORT || config.get('app-port');

require('./startup/routes')(app);
require('./startup/db')(app);
require('./startup/config')();
require('./startup/validation')();


app.listen(PORT, () => {

  if (app.get('env') === 'development') {
    logger.log({level: 'info', message: `Connection successful. Listening on Port ${PORT}`});
  }

});
