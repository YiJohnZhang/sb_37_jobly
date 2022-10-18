/** Application database module.
 */
const { Client } = require('pg');
const { DB_URI } = require('../config');

const dbClient = new Client(DB_URI);

dbClient.connect();

module.exports = dbClient;