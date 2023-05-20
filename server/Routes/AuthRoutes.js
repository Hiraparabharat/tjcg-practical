const AuthRoutes = require("express").Router();
const Users = require("../models/User");

AuthRoutes.route("/sign-in").post((req, res, next) => {
  if (req?.body?.name && req?.body?.password) {
    Users.findOne({ name: req?.body?.name }).then(async (data) => {
      if (!data) {
        return next({ staus: 400, message: "User not found" });
      }
      if (await data.comparePassword(req?.body?.password)) {
        return res.send({
          status: true,
          message: "User signed in",
          tk: data.createJwt(),
        });
      } else {
        next({ status: 400, message: "Please, enter correct password" });
      }
    });
  } else {
    next({ status: 400, message: "Please, enter credentials" });
  }
});

AuthRoutes.route("/sign-up").post((req, res, next) => {
  Users.create(req?.body)
    .then((data) => {
      res.send({ status: true, message: "User created successfully" });
    })
    .catch(next);
});

module.exports = AuthRoutes;
