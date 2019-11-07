import multer from 'multer';

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/gif') {
    cb(null, true);
  } else {
    const error = new Error('Only GIF images are allowed');
    error.status = 422;
    cb(error, false);
  }
};

const storage = multer.diskStorage({});

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
}).single('image');

export default upload;
