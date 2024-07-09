const { StatusCodes } = require('http-status-codes');
const { getUserRefreshToken } = require('../../../service/mongoose/refreshToken');

const index = async (req, res, next) => {
  try {
    const result = await getUserRefreshToken(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { index };
