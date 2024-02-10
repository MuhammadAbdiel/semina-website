const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiration, jwtRefreshExpiration } = require('../config');

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiration });
  return token;
};

const createRefreshToken = ({ payload }) => {
  const token = jwt.sign(payload, jwtSecret, { expiresIn: jwtRefreshExpiration });
  return token;
};

const isTokenValid = ({ token }) => jwt.verify(token, jwtSecret);

module.exports = {
  createJWT,
  createRefreshToken,
  isTokenValid,
};
