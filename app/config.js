const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  urlDb: process.env.URL_MONGODB_PROD,
  jwtExpiration: '24h',
  jwtSecret: 'jwtSecret',
};
