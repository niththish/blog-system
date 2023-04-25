const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const url = `public/images/${req.body.type}`;
    cb(null, url);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (
    file.mimetype.split("/")[1] === "jpeg" ||
    file.mimetype.split("/")[1] === "jpg" ||
    file.mimetype.split("/")[1] === "webp"
  ) {
    return cb(null, true);
  } else {
    return cb(new Error("Not a image File!!"), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadFile = async (req, res, next) => {
  upload.single("image")(req, res, function (err) {
    if (err) return next(err);
    else next();
  });
};

module.exports = uploadFile;
