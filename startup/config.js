const config = require('config');
const logger = require('../config/winston');

module.exports = function(){
  if(!config.get('jwtPrivateKey')) {
    logger.log({
      level: 'error',
      message: 'jwtPrivateKey was not defined. Exiting the app.'
    });
  }
}
