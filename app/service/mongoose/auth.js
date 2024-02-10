const Users = require('../../api/v1/users/model');
const { BadRequestError, UnauthorizedError } = require('../../error');
const { createJWT, createUserToken } = require('../../util');

const signin = async (req) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Email dan password harus diisi');
  }

  const result = await Users.findOne({ email });
  if (!result) {
    throw new UnauthorizedError('Email atau password salah');
  }

  const isPasswordCorrect = await result.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthorizedError('Email atau password salah');
  }

  const token = createJWT({ payload: createUserToken(result) });

  return token;
};

module.exports = {
  signin,
};
