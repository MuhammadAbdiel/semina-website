const Users = require('../../api/v1/users/model');
const Organizers = require('../../api/v1/organizers/model');
const { BadRequestError } = require('../../error');

const createOrganizer = async (req) => {
  const { organizer, role, email, password, confirmPassword, name } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError('Password dan konfirmasi password tidak cocok');
  }

  // ? DB Transaction
  const session = await Users.startSession();

  try {
    session.startTransaction();

    // ! First Operation
    const result = await Organizers.create([{ organizer }], { session });

    // ! Second Operation
    const users = await Users.create(
      [
        {
          name,
          email,
          password,
          role,
          organizer: result[0]._id,
        },
      ],
      {
        session,
      },
    );

    await session.commitTransaction();

    delete users[0]._doc.password;

    return {
      organizerName: organizer,
      ...users[0]._doc,
    };
  } catch (err) {
    await session.abortTransaction();

    throw err;
  } finally {
    session.endSession();
  }
  // ? End DB Transaction
};

const createUsers = async (req, res) => {
  const { name, password, role, confirmPassword, email } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError('Password dan konfirmasi password tidak cocok');
  }

  const result = await Users.create({
    name,
    email,
    organizer: req.user.organizer,
    password,
    role,
  });

  delete result._doc.password;

  return result;
};

const getAllUsers = async (req) => {
  let condition = {};

  if (req.user.role === 'organizer') {
    condition = { organizer: req.user.organizer };
  }

  const result = await Users.find(condition).populate({
    path: 'organizer',
    select: '_id organizer',
  });

  return result;
};

module.exports = {
  createOrganizer,
  createUsers,
  getAllUsers,
};
