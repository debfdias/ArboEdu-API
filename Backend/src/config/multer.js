const multer = require("multer");
const path = require("path");

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Permitido apenas o upload de imagens", false);
  }
};


const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __basedir + "/resources/uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-ArboEDU-${file.originalname}`);
    }
  })
};

module.exports = {
  dest: path.resolve(__basedir + "/resources/uploads/"),
  storage: storageTypes["local"],
  fileFilter: imageFilter
};

/*

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-ArboEDU-${file.originalname}`);
  },
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });

module.exports = uploadFile;*/