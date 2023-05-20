const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect(
    "mongodb+srv://Bharat825:Bharat825%40@cluster0.0yl0exr.mongodb.net/tjgc"
  );
};
