const { uploadBufferToCloudinary } = require('../utils/cloudinary');
const AppError = require('../utils/AppError');

async function uploadImage(req, res, next) {
  try {
    if (!req.file) throw new AppError('No file uploaded', 400);
    const result = await uploadBufferToCloudinary(req.file.buffer);
    res.status(201).json({
      success: true,
      message: 'Image uploaded successfully',
      data: { url: result.secure_url, publicId: result.public_id },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { uploadImage };
