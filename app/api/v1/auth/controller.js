const { StatusCodes } = require('http-status-codes');
const { signin } = require('../../../service/mongoose/auth');

const signinCMS = async (req, res, next) => {
  try {
    const result = await signin(req);

    res.status(StatusCodes.CREATED).json({
      data: {
        token: result.token,
        role: result.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signinCMS,
};
