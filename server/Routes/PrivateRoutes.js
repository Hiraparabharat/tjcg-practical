const PrivateRoutes = require("express").Router();
const jwt = require("jsonwebtoken");
const Users = require("../models/User");
const TaskRoutes = require("./TaskRoutes");

PrivateRoutes.use((req, res, next) => {
  jwt.verify(
    req.headers.authorization?.split(" ")?.[1],
    process.env.JWT_SECRET,
    function (err, decoded) {
      if (err) {
        return next(err);
      } else {
        Users.findById(decoded.uur)
          .then((data) => {
            if (!data) {
              return next({ status: 400, message: "User is not available" });
            } else {
              req.auth = data;
              next();
            }
          })
          .catch(next);
      }
    }
  );
});

PrivateRoutes.use(TaskRoutes);

module.exports = PrivateRoutes;
