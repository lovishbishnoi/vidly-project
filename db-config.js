// const config = require('config');
//
// const APP_URL = config.get('application-url');
// const db_name = config.get('collection-name');
// const api_prefix = config.get('api-prefix');
// const api_version = config.get('api-version');

function connectionurl() {
    return `mongodb://localhost/vidly`;
}

module.exports = connectionurl;
