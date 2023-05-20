const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const schema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "name is required"], unique: true },
    password: { type: String, required: [true, "password is required"] },
  },
  {
    timestamps: true,
    versionKey: false,
    methods: {
      createJwt: function () {
        return jwt.sign({ uur: this._id }, process.env.JWT_SECRET, {
          expiresIn: "2m",
        });
      },
      comparePassword: function (password) {
        return bcrypt.compare(password, this.password);
      },
    },
  }
);

schema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("users", schema);
