const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiration, jwtRefreshTokenExpiration, jwtRefreshTokenSecret } = require('../config');

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiration });
  return token;
};

const createRefreshToken = ({ payload }) => {
  const token = jwt.sign(payload, jwtRefreshTokenSecret, { expiresIn: jwtRefreshTokenExpiration });
  return token;
};

const isTokenValid = ({ token }) => jwt.verify(token, jwtSecret);
const isTokenValidRefreshToken = ({ token }) => jwt.verify(token, jwtRefreshTokenSecret);

module.exports = {
  createJWT,
  createRefreshToken,
  isTokenValid,
  isTokenValidRefreshToken,
};
