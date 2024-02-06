const Images = require('../../api/v1/images/model');
const { NotFoundError } = require('../../error');

const getAllImages = async () => {
  const result = await Images.find();

  return result;
};

const createImages = async (req) => {
  const result = await Images.create({
    name: req.file ? `uploads/${req.file.filename}` : 'uploads/avatar/default.png',
  });

  return result;
};

// tambahkan function checking Image
const checkingImage = async (id) => {
  const result = await Images.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada Gambar dengan id :  ${id}`);

  return result;
};

module.exports = { getAllImages, createImages, checkingImage };
