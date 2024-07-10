const UserRefreshToken = require('../../api/v1/userRefreshToken/model');
const { isTokenValidRefreshToken, createJWT, createUserToken, createRefreshToken } = require('../../util');
const Users = require('../../api/v1/users/model');
const { NotFoundError, BadRequestError } = require('../../error');

const createUserRefreshToken = async (payload) => {
  const result = await UserRefreshToken.create(payload);

  return result;
};

const getUserRefreshToken = async (req) => {
  const { refreshToken, email } = req.params;
  const result = await UserRefreshToken.findOne({
    refreshToken,
  });

  if (!result) throw new NotFoundError('Refresh Token tidak valid');

  const payload = isTokenValidRefreshToken({ token: result.refreshToken });

  if (payload.email !== email) throw new BadRequestError('Email tidak valid');

  const userCheck = await Users.findOne({ email: payload.email });

  const token = createJWT({ payload: createUserToken(userCheck) });
  // const jwtRefreshToken = createRefreshToken({ payload: createUserToken(result) });
  // await createUserRefreshToken({
  //   jwtRefreshToken,
  //   user: result._id,
  // });

  return {
    token,
    //  refreshToken: jwtRefreshToken
  };
};

module.exports = { createUserRefreshToken, getUserRefreshToken };
