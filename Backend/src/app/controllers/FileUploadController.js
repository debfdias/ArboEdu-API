const fs = require("fs");
const path = require("path");

const { Files } = require('../models');


const uploadFiles = async (req, res) => {
  try {
    console.log(req.file);

    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }

    Files.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      data: fs.readFileSync(
        __basedir + "/resources/uploads/" + req.file.filename
      ),
    }).then((file) => {
      fs.writeFileSync(
        __basedir + "/resources/tmp/" + file.name,
        file.data
      );

      return res.send(`File has been uploaded.`);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

module.exports = {
  uploadFiles,
};